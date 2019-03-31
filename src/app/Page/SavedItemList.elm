module Page.SavedItemList exposing (Model, Msg, init, view, update, subscriptions, toSession, setSession)

import Browser
import Time exposing (Posix)
import Task exposing (Task)
import Set exposing (Set)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Encode as Encode exposing (Value, int, string, object)
import Json.Decode as Decode exposing (string, int, list, Decoder)
import Json.Decode.Pipeline exposing (required)
import RemoteData exposing (WebData)
import Multiselect

import Auth0
import Session exposing (Session)
import Route
import SavedItemId as Si

import RemoteDataHelpers exposing (AuthWebData(..), mapResult, handleResult, makeGetRequest, makePutRequest, makePatchRequest, makeEmptyPatchRequest, createErrorMessage, viewError)
import Loading exposing (loading)
import SavedItem exposing (SavedItemType(..), SavedItem, itemTypeToString, savedItemDecoder, savedItemEncoder)

type alias FilterTag = 
  { name: String
  , isFilteredBy: Bool
  }
 
type alias Model =
  { session: Session
  , savedItems: AuthWebData (List SavedItem)
  , showAll: Bool
  , filterTags: List FilterTag
  }

toSession model =
  model.session

setSession session model =
  let
    user = (Session.toUser session)
  in
    ({ model | session = session }
    , Cmd.batch 
      [ fetchSavedItemsCommand user False []
      , fetchTagsCommand user
      ])

toPair values =
  values
  |> List.map (\v -> (v,v))
    
type Msg
  = FetchSavedItems
  | ReceiveSavedItems (AuthWebData (List SavedItem))
  | ReceiveTags (AuthWebData (List String))
  | ToggleShowAll
  | ToggleFilterBy String
  | MarkRead String
  | MarkReadResult (AuthWebData String)
  
fetchTagsCommand : Maybe Auth0.LoggedInUser -> Cmd Msg
fetchTagsCommand user =
  case user of
    Nothing ->
      Cmd.map (always ReceiveTags AuthError) Cmd.none
    Just loggedIn ->
      list (Decode.string)
        |> makeGetRequest "/api/tags" loggedIn
        |> RemoteData.sendRequest
        |> Cmd.map WebResponse
        |> Cmd.map ReceiveTags

fetchSavedItemsCommand : Maybe Auth0.LoggedInUser -> Bool -> List FilterTag -> Cmd Msg
fetchSavedItemsCommand user showAll tags =
  case user of
    Nothing -> 
      Cmd.map (always ReceiveSavedItems AuthError) Cmd.none

    Just loggedIn ->
      let
        showAllQuery = if showAll then "true" else "false"
        baseUrl = "/api/savedItems?includeRead=" ++ showAllQuery
        tagQuery =
          tags
          |> List.filter (\ft -> ft.isFilteredBy)
          |> List.map (\ft -> ft.name)
          |> String.join ","
        url = 
          if String.isEmpty tagQuery 
          then baseUrl 
          else baseUrl ++ "&tags=" ++ tagQuery  
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
     
update msg model =
  let
    user = Session.toUser model.session
  in
  case msg of
    ReceiveTags response ->
      case response of
            WebResponse wr ->
              case wr of
                RemoteData.Success tags ->
                  let
                    filterTags =
                      tags
                      |> List.map (\t -> { name = t, isFilteredBy = False })
                    newModel =
                      { model | filterTags = filterTags }
                  in
                    (newModel, Cmd.none)
                _ -> (model, Cmd.none)
            _ -> (model, Cmd.none)
    FetchSavedItems ->
      ({ model | savedItems = WebResponse RemoteData.Loading }, fetchSavedItemsCommand user model.showAll model.filterTags)
    ReceiveSavedItems response ->
      ({ model | savedItems = response }, Cmd.none)
    MarkRead id ->
      (model, markItemReadCommand user id)
    MarkReadResult _ ->
      ({ model | savedItems = WebResponse RemoteData.Loading }, fetchSavedItemsCommand user model.showAll model.filterTags)
    ToggleShowAll ->
      let
        newModel = 
          { model 
          | showAll = not model.showAll
          , savedItems = WebResponse RemoteData.Loading
          }
      in
      (newModel, fetchSavedItemsCommand user newModel.showAll model.filterTags)
    ToggleFilterBy value ->
      let
        tags =
          model.filterTags
          |> List.map (\ft ->
            if ft.name == value then {ft | isFilteredBy = not ft.isFilteredBy }
            else ft            
          )
        newModel = { model | filterTags = tags }
      in
      (newModel, fetchSavedItemsCommand user newModel.showAll newModel.filterTags)

init: Session -> (Model, Cmd Msg)
init session =
  let
    user = (Session.toUser session)
  in
  ( { session = session, savedItems = WebResponse RemoteData.Loading, showAll = False, filterTags = [] }
  , Cmd.batch 
    [ fetchSavedItemsCommand user False []
    , fetchTagsCommand user
    ]
  )

viewAddSavedItemResults results =
  handleResult results (\r ->
    case r of
      RemoteData.NotAsked -> text ""
      RemoteData.Loading -> text ""
      RemoteData.Success _ -> text ""
      RemoteData.Failure error ->
        error
        |> createErrorMessage
        |> (\m -> text m )
  )

itemTypeToString it =
  case it of
  Reference -> "Reference"
  ToDo -> "ToDo"

viewTags tags =
  tags
  |> List.map (\t -> li [ class "di ma1 pa1 ba b--black-10 bg-washed-blue" ] [ text t ] )

viewSavedItem item =
  let
    id = Si.Id item.id
  in
  li [ class "mv2 pa1 shadow-3 bg-washed-blue flex flex-rows flex-wrap" ] 
    [ span [ class "fa6 w-50" ] [ text (itemTypeToString item.itemType)]
    , span [ class "w-50 tr" ] 
      [ a [ Route.href (Route.SavedEdit id), class "link dim dark-blue" ] [ text "Edit" ]
      , span [ onClick (MarkRead item.id), class "mh2 link dim dark-blue pointer" ] [ text "Mark Read" ]
      ]
    , a [ href item.link, class "link dim dark-blue truncate w-100", target "_blank", rel "noopener noreferrer" ] [ text item.title ]
    , span [] [ text (Maybe.withDefault "" item.description) ]
    , ul [ class "list pl0 db flex flex-row w-100" ] (viewTags item.tags)
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

viewHtml: Model -> Html Msg
viewHtml model =
    div [] 
        [ h1 [] [ text "Saved Items" ]
        , nav [ ]
          [ ul [ class "list pl0" ]
            [ li [ class "dib dim mr3" ] [ a [ Route.href <| Route.ReadLater, class "link f6 fw6" ] [ text "To Read" ] ]
            , li [ class "dib dim mr3" ] [ a [ Route.href <| Route.FeedItems, class "link f6 fw6" ] [ text "Feed Items" ] ]
            , li [ class "dib dim mr3" ] [ a [ Route.href <| Route.SavedNew Nothing Nothing Nothing, class "link dim f6 fw6" ] [ text "Add Item" ] ]
            ]
          ]
        , label [] 
          [ input [ type_ "checkbox", onClick ToggleShowAll ] []
          , text "Show All"
          ]
        , p []
          [ ul [ class "list pl0 flex flex-row flex-wrap" ]
            (model.filterTags
            |> List.map (\ft -> 
              li 
                [ onClick (ToggleFilterBy ft.name)
                , class "di ma1 pa1 ba b--black-10 pointer dark-blue bg-animate"
                , class (if ft.isFilteredBy then "bg-navy hover-bg-light-gray" else "bg-washed-blue hover-bg-light-yellow")
                ] 
                [text ft.name] 
              )
            )
          ]
        , viewSavedItems model.savedItems
        ]

view model =
  { content = viewHtml model
  , title = "Saved Items"
  }

subscriptions model =
  Sub.none