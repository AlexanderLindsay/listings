module Page.ReadLater exposing (Model, Msg, toSession, setSession, init, update, view, subscriptions)

import Browser
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

import RemoteDataHelpers exposing (AuthWebData(..), handleResult, makeGetRequest, makePutRequest, makeEmptyPatchRequest, createErrorMessage, viewError)
import Loading exposing (loading)
import SavedItem exposing (SavedItem, savedItemDecoder, savedItemEncoder)

type alias Model =
  { session: Session
  , savedItems : AuthWebData (List SavedItem)
  }

type Msg
  = FetchSavedItems
  | ReceiveSavedItems (AuthWebData (List SavedItem))
  | MarkRead String
  | MarkReadResult (AuthWebData String)

toSession model =
  model.session
  
setSession session model =
  ({ model | session = session }, fetchSavedItemsCommand (Session.toUser session))

fetchSavedItemsCommand : Maybe Auth0.LoggedInUser -> Cmd Msg
fetchSavedItemsCommand user =
  case user of
    Nothing -> 
      Cmd.map (always ReceiveSavedItems AuthError) Cmd.none

    Just loggedIn ->
      let
        url = "/api/savedItems?type=ToDo"
      in
      list savedItemDecoder
          |> makeGetRequest url loggedIn
          |> RemoteData.sendRequest
          |> Cmd.map WebResponse
          |> Cmd.map ReceiveSavedItems
          
markItemReadCommand: Maybe Auth0.LoggedInUser -> String -> Cmd Msg
markItemReadCommand user id =
  case user of
    Nothing -> 
      Cmd.map (always MarkReadResult AuthError) Cmd.none
    Just loggedIn ->
      makeEmptyPatchRequest ("/api/savedItems/read/" ++ id) loggedIn
      |> RemoteData.sendRequest
      |> Cmd.map WebResponse
      |> Cmd.map MarkReadResult
      
init: Session -> (Model, Cmd Msg)
init session =
  ( { session = session
    , savedItems = WebResponse RemoteData.Loading
    }
  , fetchSavedItemsCommand (Session.toUser session)
  )

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
    user = Session.toUser model.session
  in
  case msg of
    FetchSavedItems ->
      ({ model | savedItems = WebResponse RemoteData.Loading }, fetchSavedItemsCommand user)
    ReceiveSavedItems response ->
      ({ model | savedItems = response }, Cmd.none)
    MarkRead id ->
      ( model, markItemReadCommand user id)
    MarkReadResult _ ->
      ({ model | savedItems = WebResponse RemoteData.Loading }, fetchSavedItemsCommand user)

viewTags tags =
  tags
  |> List.map (\t -> li [ class "di ma1 pa1 ba b--black-10 bg-washed-blue" ] [ text t ])

viewSavedItem item =
  li [ class "mv2 pa1 shadow-3 bg-washed-blue" ] 
    [ a [ href item.link, class "dark-blue link dim truncate mw-70 dib", target "_blank", rel "noopener noreferrer" ] [ text item.title ]
    , span [ onClick (MarkRead item.id), class "dark-blue link dim mh2 dib fr pointer" ] [ text "Mark Read" ]
    , ul [ class "list pl0 db mh2 flex flex-row" ] (viewTags item.tags)
    ]

viewSavedItems: (AuthWebData (List SavedItem)) -> Html Msg
viewSavedItems savedItemResults =
  handleResult savedItemResults (\r ->
      case r of
        RemoteData.NotAsked ->
          text ""
        RemoteData.Loading ->
          loading
        RemoteData.Success items ->
          ul [ class "list pl0 item-grid" ] 
            (items
            |> List.map viewSavedItem)
        RemoteData.Failure error ->
          error
          |> createErrorMessage
          |> viewError)

viewHtml : Model -> Html Msg
viewHtml model =
  div [] 
      [ h1 [] [ text "To Read" ]
      , nav [ ]
        [ ul [ class "list pl0" ]
          [ li [ class "dib dim mr3" ] [ a [ Route.href Route.FeedItems, class "link f6 fw6" ] [ text "Feed Items" ] ]
          , li [ class "dib dim mr3" ] [ a [ Route.href Route.SavedList, class "link f6 fw6" ] [ text "All Saved" ] ]
          ]
        ]
      , viewSavedItems model.savedItems
      ]
      
view model =
  { content = viewHtml model
  , title = "To Read"
  }