module Page.SavedItemEdit exposing (Model, Msg, init, initNew, view, update, subscriptions, toSession, setSession)

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

emptyItemId = "newId"

type alias FilterTag = 
  { name: String
  , isFilteredBy: Bool
  }
 
type alias Model =
  { session: Session
  , item: SavedItem
  , results: AuthWebData String
  , tagModel: Multiselect.Model
  , tags: List String
  }

toSession model =
  model.session

setSession session model =
  let
    user = (Session.toUser session)
  in
    ({ model | session = session }
    , Cmd.batch 
      [ fetchTagsCommand user
      , fetchItemCommand user model.item.id
      ])

toPair values =
  values
  |> List.map (\v -> (v,v))
  
setTitle savedItem title =
  { savedItem | title = title }

setLink savedItem link =
  { savedItem | link = link }
  
setType savedItem itemType =
  { savedItem | itemType = itemType }

setCreatedOn savedItem createdOn =
  { savedItem | createdOn = createdOn }

setDescription savedItem description = 
  { savedItem | description = Just description }
  
asToBeSavedIn model savedItem =
  { model | item = savedItem }
  
type Msg
  = ReceiveTags (AuthWebData (List String))
  | ReceiveItem (AuthWebData SavedItem)
  | SetSavedTitle String
  | SetSavedLink String
  | SetDescription String
  | SetSavedItemType SavedItemType
  | SetCreatedOn Time.Posix
  | SaveItem
  | SaveItemResult (AuthWebData String)
  | Tags Multiselect.Msg
  
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

fetchItemCommand : Maybe Auth0.LoggedInUser -> String -> Cmd Msg
fetchItemCommand user id =
  case user of
    Nothing -> 
      Cmd.map (always ReceiveItem AuthError) Cmd.none

    Just loggedIn ->
      let
        url = "/api/savedItems/" ++ id
      in
      savedItemDecoder
          |> makeGetRequest url loggedIn
          |> RemoteData.sendRequest
          |> Cmd.map WebResponse
          |> Cmd.map ReceiveItem

saveItemCommand: Maybe Auth0.LoggedInUser -> SavedItem -> (List String) -> Cmd Msg
saveItemCommand user item tags =
  case user of
    Nothing -> Cmd.map (always SaveItemResult AuthError) Cmd.none
    Just loggedIn ->
      let
        isNew = item.id == emptyItemId
        toSave = { item | tags = tags }
      in
      case isNew of
        True ->
          savedItemEncoder toSave
          |> makePutRequest "/api/savedItems" loggedIn
          |> RemoteData.sendRequest
          |> Cmd.map WebResponse
          |> Cmd.map SaveItemResult
        False ->
          savedItemEncoder toSave
          |> makePatchRequest ("/api/savedItems/" ++ item.id) loggedIn
          |> RemoteData.sendRequest
          |> Cmd.map WebResponse
          |> Cmd.map SaveItemResult

update: Msg -> Model -> ( Model, Cmd Msg)
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
                    values =
                        Multiselect.getValues model.tagModel

                    selected =
                        Multiselect.getSelectedValues model.tagModel
                        
                    newValues =
                      toPair tags
                    
                    multiModel = Multiselect.populateValues model.tagModel (values ++ newValues) (selected)
                    
                    newModel = {model | tagModel = multiModel, tags = tags }
                  in
                    (newModel, Cmd.none)
                _ -> (model, Cmd.none)
            _ -> (model, Cmd.none)
    ReceiveItem response ->
      case response of
        WebResponse wr ->
          case wr of
            RemoteData.Success item ->
              let
                values =
                        Multiselect.getValues model.tagModel
                selected =
                        Multiselect.getSelectedValues model.tagModel
                loadedTags =
                        item.tags
                        |> List.map (\v -> (v, v))
                multiModel = 
                        Multiselect.populateValues model.tagModel values (selected ++ loadedTags)
              in
              ({ model | item = item , tagModel = multiModel }, Cmd.none)
            _ -> (model, Cmd.none)
        _ -> (model, Cmd.none)
    SetSavedTitle title ->
      let
        newModel = 
          title
          |> setTitle model.item
          |> asToBeSavedIn model
      in
      (newModel, Cmd.none)
    SetSavedLink link ->
      let
        newModel = 
          link
          |> setLink model.item
          |> asToBeSavedIn model
      in
      (newModel, Cmd.none)
    SetDescription description ->
      let
        newModel =
          description
          |> setDescription model.item
          |> asToBeSavedIn model
      in
      (newModel, Cmd.none)
    SetSavedItemType itemType ->
      let
        newModel =
          itemType
          |> setType model.item
          |> asToBeSavedIn model
      in
      (newModel, Cmd.none)
    SetCreatedOn createdOn ->
      let
        newModel =
          createdOn
          |> setCreatedOn model.item
          |> asToBeSavedIn model
      in
      (newModel, Cmd.none)
    SaveItem ->
      let
        tags =
          Multiselect.getSelectedValues model.tagModel
          |> List.map (\(k, v) -> v)
      in
        ({model | results = WebResponse RemoteData.Loading }, saveItemCommand user model.item tags)
    SaveItemResult response ->
      let
        newEditModel = { model | results = response }
        navKey = Session.navKey model.session
      in
          case response of
            WebResponse wr ->
              case wr of
                RemoteData.Success _ -> 
                 --(model, Route.to navKey Route.SavedList)
                 (newEditModel, Cmd.none)
                _ -> (newEditModel, Cmd.none)
            _ -> (newEditModel, Cmd.none)
    Tags sub ->
      let
          ( subModel, subCmd, outMsg ) =
              Multiselect.update sub model.tagModel
          
          newModel = 
            { model | tagModel = subModel }
          
          ( newerModel, outCommands) =
            case outMsg of
              Just m ->
                handleTag m newModel
              Nothing ->
                (newModel, Cmd.none)
      in
      ( newerModel, Cmd.batch [ Cmd.map Tags subCmd, outCommands ] )

addTag : Multiselect.Model -> ( String, String ) -> ( Multiselect.Model, Cmd Msg )
addTag multiselectModel tag =
    let
        values =
            Multiselect.getValues multiselectModel

        selected =
            Multiselect.getSelectedValues multiselectModel

        alreadyExists =
            List.member tag values
    in
    if alreadyExists then
        ( multiselectModel, Cmd.none )

    else
        Multiselect.populateValues multiselectModel (values ++ [ tag ]) (selected ++ [ tag ])
            |> Multiselect.clearInputText
            |> (\( m, c ) -> ( m, Cmd.map Tags c ))

handleTag : Multiselect.OutMsg -> Model -> ( Model, Cmd Msg )
handleTag msg model =
    case msg of
        Multiselect.NotFound v ->
            let
                tag =
                    ( v, v )

                multiselectModel =
                    model.tagModel

                ( populated, cmd ) =
                    addTag multiselectModel tag
            in
            ( { model | tagModel = populated }, cmd )

        _ ->
            ( model, Cmd.none )

init: Session -> Si.Id -> (Model, Cmd Msg)
init session siid =
  let
    user = (Session.toUser session)
    id = Si.toString siid
  in
  ( { session = session
    , item = { id = id
        , title = ""
        , link = ""
        , description = Nothing
        , tags = []
        , itemType = Reference
        , createdOn = (Time.millisToPosix 0)
        , isRead = False
        , readOn = Nothing
        }
    , results = WebResponse RemoteData.NotAsked
    , tagModel = Multiselect.populateValues (Multiselect.initModel [] "_tags") [] []
    , tags = []
    }
  , Cmd.batch 
    [ fetchTagsCommand user
    , fetchItemCommand user id
    ]
  )

initNew: Session -> Maybe String -> Maybe String -> Maybe String -> (Model, Cmd Msg)
initNew session title text url =
  let
    user = (Session.toUser session)
    titleValue = Maybe.withDefault "" title
    textValue = Maybe.withDefault titleValue text
    link = Maybe.withDefault textValue url
  in
  ( { session = session
    , item = { id = emptyItemId
        , title = titleValue
        , link = link
        , description = text
        , tags = []
        , itemType = Reference
        , createdOn = (Time.millisToPosix 0)
        , isRead = False
        , readOn = Nothing
        }
    , results = WebResponse RemoteData.NotAsked
    , tagModel = Multiselect.populateValues (Multiselect.initModel [] "_tags") [] []
    , tags = []
    }
  , Cmd.batch 
    [ fetchTagsCommand user
    , Task.perform SetCreatedOn Time.now
    ]
  )

viewAddSavedItemResults results =
  handleResult results (\r ->
    case r of
      RemoteData.NotAsked -> text ""
      RemoteData.Loading -> text "Saving..."
      RemoteData.Success _ -> text "Saved!"
      RemoteData.Failure error ->
        error
        |> createErrorMessage
        |> (\m -> text m )
  )

changeItemType value =
  let
    itemType =
        case value of
        "Reference" -> Reference
        "ToDo" -> ToDo
        _ -> Reference
  in
    SetSavedItemType itemType

itemTypeToString it =
  case it of
  Reference -> "Reference"
  ToDo -> "ToDo"

optionAttributes key selectedKey attributes =
  if selectedKey == key then
    attributes ++ [ selected True ]
  else
    attributes
    
createOption key selectedKey =
  option (optionAttributes key selectedKey [ value key ] ) [ text key ]

viewHtml model =
  div [ class "w-70 mw7"] 
    [ div [] [ a [ Route.href Route.SavedList ] [ text "← Back to List"] ]
    , h1 [] [ text "Save Url" ]
    , label [] 
      [ text "Title"
      , input [ class "db ba br1 mr2 b--black-20 pa1 mv1 w-100", type_ "text", placeholder "Saved Item Title", value model.item.title, onInput SetSavedTitle ] []
      ]
    , label []
      [ text "Link"
      , input [ class "db ba br1 mr2 b--black-20 pa1 mv1 w-100", type_ "text", placeholder "https://saved-item.link", value model.item.link, onInput SetSavedLink ] []
      ]
    , label [] 
      [ text "Description"
      , textarea [ class "db ba br1 mr2 b--black-20 pa1 mv1 w-100", cols 80, rows 5, onInput SetDescription, placeholder "Enter description of content here", value (Maybe.withDefault "" model.item.description) ] []
      ]
    , label []
      [ text "Type"
      , select [ onInput changeItemType, class "mv1 ba br1 db pa1 w-100" ] 
        [ createOption (itemTypeToString Reference) (itemTypeToString model.item.itemType)
        , createOption (itemTypeToString ToDo) (itemTypeToString model.item.itemType)
        ]
      ]
    , label []
      [ text "Tags"
      , Html.map Tags <| Multiselect.view model.tagModel
      ]
    , div [ class "mv1" ]
      [ button [ onClick SaveItem, class "dib ba b--black-20 bg-moon-gray pa1 br2 no-underline hover-bg-washed-blue purple" ] [ text "Save Item" ]
      , a [ Route.href Route.SavedList, class "mh2 dib ba b--black-20 bg-moon-gray pa1 br2 no-underline hover-bg-washed-blue purple" ] [ text "Cancel" ]
      ]
    , span [] [viewAddSavedItemResults model.results]
    ]

view model =
  { content = viewHtml model
  , title = "Edit Item"
  }

subscriptions model =
  Sub.map Tags <| Multiselect.subscriptions model.tagModel