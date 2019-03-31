module Page.Feeds exposing (Model, Msg, init, view, update, subscriptions, toSession, setSession)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Encode as Encode exposing (Value, int, string, object)
import Json.Decode as Decode exposing (string, int, list, Decoder)
import Json.Decode.Pipeline exposing (required)
import RemoteData exposing (WebData)

import Auth0
import Route
import Session exposing (Session)

import RemoteDataHelpers exposing (AuthWebData(..), handleResult, makeGetRequest, makePutRequest, createErrorMessage, viewError)
import Loading exposing (loading)

type alias Feed = 
  { title: String
  , id: String
  }

type alias Model =
  { session: Session
  , feeds: AuthWebData (List Feed)
  , newFeedUrl: String
  , addFeedResult: AuthWebData String
  }

type Msg 
  = FetchFeeds
  | ReceiveFeeds (AuthWebData (List Feed))
  | SetFeedUrl String
  | AddFeed
  | AddFeedResult (AuthWebData String)

toSession model =
  model.session
  
setSession session model =
  ({ model | session = session }, fetchFeedsCommand (Session.toUser session))

feedDecoder : Decoder Feed
feedDecoder =
  Decode.succeed Feed
    |> required "title" string
    |> required "id" string

fetchFeedsCommand : Maybe Auth0.LoggedInUser -> Cmd Msg
fetchFeedsCommand user =
  case user of
    Nothing -> 
      Cmd.map (always ReceiveFeeds AuthError) Cmd.none

    Just loggedIn ->
      list feedDecoder
          |> makeGetRequest "/api/feeds" loggedIn
          |> RemoteData.sendRequest
          |> Cmd.map WebResponse
          |> Cmd.map ReceiveFeeds

addFeedCommand: Maybe Auth0.LoggedInUser -> Model -> Cmd Msg
addFeedCommand user model =
  case user of
    Nothing -> Cmd.map (always AddFeedResult "Not Authenticated") Cmd.none
    Just loggedIn ->
      makePutRequest "/api/feeds" loggedIn (Encode.object [("feedUrl", Encode.string model.newFeedUrl)])
      |> RemoteData.sendRequest
      |> Cmd.map WebResponse
      |> Cmd.map AddFeedResult

update: Msg -> Model -> ( Model, Cmd Msg)
update msg model =
  let
    user = Session.toUser model.session
  in
  case msg of
    FetchFeeds ->
      ({ model | feeds = WebResponse RemoteData.Loading }, fetchFeedsCommand user)
    ReceiveFeeds response ->
      ({ model | feeds = response }, Cmd.none)
    SetFeedUrl url ->
      ({ model | newFeedUrl = url }, Cmd.none)
    AddFeed ->
      (model, addFeedCommand user model)
    AddFeedResult response ->
      ({ model | addFeedResult = response }, fetchFeedsCommand user)

init: Session -> (Model, Cmd Msg)
init session =
  ( { session = session
    , feeds = WebResponse RemoteData.Loading
    , newFeedUrl = ""
    , addFeedResult = WebResponse RemoteData.NotAsked
    }
  , fetchFeedsCommand (Session.toUser session)
  )

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

viewAddFeedResult result =
  handleResult result (\r ->
    case r of
      RemoteData.NotAsked -> text ""
      RemoteData.Loading -> text ""
      RemoteData.Success _ -> text ""
      RemoteData.Failure error ->
        error
        |> createErrorMessage
        |> (\m -> text m )
  )

viewFeeds: (AuthWebData (List Feed)) -> Html Msg
viewFeeds feedResults =
  handleResult feedResults (\r ->
      case r of
        RemoteData.NotAsked ->
          text ""
        RemoteData.Loading ->
          loading
        RemoteData.Success feeds ->
          ul [ class "list pl0" ] 
            (feeds
            |> List.map (\f -> li [] [ text f.title ]))
        RemoteData.Failure error ->
          error
          |> createErrorMessage
          |> viewError)

viewHtml: Model -> Html Msg
viewHtml model =
  div [] 
      [ h1 [] [ text "Feeds" ]
      , nav [ ]
        [ ul [ class "list pl0" ]
          [ li [ class "dib dim mr3" ] [ a [ Route.href Route.FeedItems, class "link f6 fw6" ] [ text "Back to Items" ] ]
          , li [ class "dib dim mr3" ] [ a [ Route.href Route.ReadLater, class "link f6 fw6" ] [ text "To Read" ] ]
          , li [ class "dib dim mr3" ] [ a [ Route.href Route.SavedList, class "link f6 fw6" ] [ text "All Saved" ] ]
          ]
        ]
      , div [] 
        [ input [ type_ "text", placeholder "https://rss-feed-url.here", value model.newFeedUrl, onInput SetFeedUrl, class "ba br1 mr2 b--black-20 pa1" ] []
        , button [ onClick AddFeed, class "dib ba b--black-20 bg-moon-gray pa1 br2 no-underline hover-bg-washed-blue purple" ] [ text "Add Rss Feed" ]
        , span [] [viewAddFeedResult model.addFeedResult]
        ]
      , viewFeeds model.feeds
      ]

view model =
  { content = viewHtml model
  , title = "Feeds"
  }