module Page.FeedItems exposing (Model, Msg, init, view, update, subscriptions, toSession, setSession)

import Browser
import Time exposing (Posix)
import Task exposing (Task)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode exposing (string, int, list, Decoder)
import Json.Decode.Pipeline exposing (required)
import RemoteData exposing (WebData)

import Auth0
import Route
import Session exposing (Session)

import RemoteDataHelpers exposing (AuthWebData(..), handleResult, makeGetRequest, makePutRequest, createErrorMessage, viewError)
import Loading exposing (loading)
import SavedItem exposing (SavedItemType(..), SavedItem, savedItemDecoder, savedItemEncoder)

type alias FeedItem =
  { id: String
  , feed: String
  , title: String
  , content: String
  , link: String
  , publishedOn: String
  }

type alias Model =
  { session: Session
  , feedItems: AuthWebData (List FeedItem)
  }
  
type Msg
  = FetchFeedItems
  | ReceiveFeedItems (AuthWebData (List FeedItem))
  | SaveItem FeedItem
  | SaveItemResult (AuthWebData String)
  | ReceiveCreatedOn FeedItem Posix


toSession model =
  model.session

setSession session model =
  ({ model | session = session }, fetchFeedItemsCommand (Session.toUser session))

feedItemDecoder : Decoder FeedItem
feedItemDecoder =
  Decode.succeed FeedItem
    |> required "id" string
    |> required "feed" string
    |> required "title" string
    |> required "content" string
    |> required "link" string
    |> required "publishedOn" string

createSavedItem : FeedItem -> Posix -> SavedItem
createSavedItem feedItem now =
  { id = ""
  , title = feedItem.title
  , link = feedItem.link
  , description = Nothing
  , tags = [ feedItem.feed ]
  , itemType = ToDo
  , createdOn = now
  , isRead = False
  , readOn = Nothing
  }

fetchFeedItemsCommand : Maybe Auth0.LoggedInUser -> Cmd Msg
fetchFeedItemsCommand user =
  case user of
    Nothing -> 
      Cmd.map (always ReceiveFeedItems AuthError) Cmd.none

    Just loggedIn ->
      list feedItemDecoder
          |> makeGetRequest "/api/feedItems" loggedIn
          |> RemoteData.sendRequest
          |> Cmd.map WebResponse
          |> Cmd.map ReceiveFeedItems

saveItemCommand: Maybe Auth0.LoggedInUser -> FeedItem -> Posix -> Cmd Msg
saveItemCommand user item now =
  case user of
    Nothing ->
      Cmd.map (always SaveItemResult AuthError) Cmd.none
    
    Just loggedIn ->
      createSavedItem item now
        |> savedItemEncoder
        |> makePutRequest "/api/savedItems" loggedIn
        |> RemoteData.sendRequest
        |> Cmd.map WebResponse
        |> Cmd.map SaveItemResult

init: Session -> (Model, Cmd Msg)
init session =
  ( { session = session
    , feedItems = WebResponse RemoteData.Loading
    }
  , fetchFeedItemsCommand (Session.toUser session)
  )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
    user = Session.toUser model.session
  in
  case msg of
    FetchFeedItems ->
      ({ model | feedItems = WebResponse RemoteData.Loading }, fetchFeedItemsCommand user)
    ReceiveFeedItems response ->
      ({ model | feedItems = response }, Cmd.none)
    ReceiveCreatedOn item now ->
      (model, saveItemCommand user item now)
    SaveItem item ->
      (model, Task.perform (ReceiveCreatedOn item) Time.now)
    SaveItemResult result ->
      (model, Cmd.none)

viewItem item =
  li [ class "mv2 pa1 shadow-3 bg-washed-blue flex flex-rows flex-wrap" ] 
    [ span [ class "w-75 f7" ] [ text item.feed ]
    , a [ href "#", onClick (SaveItem item), class "link dim w-25 tr dark-blue" ] [ text "Save" ]
    , a [ href item.link, class "link dim dark-blue", target "_blank", rel "noopener noreferrer" ] [ text item.title ]
    ]

viewFeedItems: (AuthWebData (List FeedItem)) -> Html Msg
viewFeedItems feedItemResults =
  handleResult feedItemResults (\r ->
  case r of
    RemoteData.NotAsked ->
      text ""
    RemoteData.Loading ->
      loading
    RemoteData.Success feedItems ->
      ul [ class "list pl0 item-grid" ] 
        (feedItems
        |> List.map viewItem)
    RemoteData.Failure error ->
      error
      |> createErrorMessage
      |> viewError)

viewHtml : Model -> Html Msg
viewHtml model =
   div [] 
      [ h1 [] [ text "Items" ]
      , nav [ ]
        [ ul [ class "list pl0" ]
          [ li [ class "dib dim mr3" ] [ a [ Route.href Route.Feeds, class "link f6 fw6" ] [ text "Manage feeds" ] ]
          , li [ class "dib dim mr3" ] [ a [ Route.href Route.ReadLater, class "link f6 fw6" ] [ text "To Read" ] ]
          , li [ class "dib dim mr3" ] [ a [ Route.href Route.SavedList, class "link f6 fw6" ] [ text "All Saved" ] ]
          ]
        ]
      , viewFeedItems model.feedItems
      ]

view model =
  { content = viewHtml model
  , title = "Feed Items"
  }

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none