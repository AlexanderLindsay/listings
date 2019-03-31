module SavedItem exposing (SavedItemType(..), SavedItem, itemTypeToString, savedItemDecoder, savedItemEncoder)

import Time exposing (Posix)
import Json.Encode as Encode exposing (Value, int, string, object)
import Json.Decode as Decode exposing (string, int, list, Decoder)
import Json.Decode.Pipeline exposing (required, optional)

type SavedItemType
  = Reference
  | ToDo

type alias SavedItem =
  { id : String
  , title : String
  , link : String
  , description: Maybe String
  , tags: (List String)
  , itemType: SavedItemType
  , createdOn: Posix
  , isRead: Bool
  , readOn: Maybe Posix
  }

itemTypeToString itemType =
  case itemType of
    Reference -> "Reference"
    ToDo -> "ToDo"

dateDecoder: Decoder Posix
dateDecoder =
  Decode.int
  |> Decode.andThen (\val ->
    Time.millisToPosix val
    |> Decode.succeed
  )

savedItemTypeDecoder : Decoder SavedItemType
savedItemTypeDecoder =
    Decode.string
    |> Decode.andThen (\str ->
       case str of
            "Reference" ->
                Decode.succeed Reference
            "ToDo" ->
                Decode.succeed ToDo
            somethingElse ->
                Decode.fail <| "Unknown SavedItemType: " ++ somethingElse
    )
        
savedItemTypeEncoder itemType =
  case itemType of
    Reference -> "Reference"
    ToDo -> "ToDo"

savedItemDecoder : Decoder SavedItem
savedItemDecoder =
  Decode.succeed SavedItem
    |> required "id" Decode.string
    |> required "title" Decode.string
    |> required "link" Decode.string
    |> optional "description" (Decode.map Just Decode.string) Nothing
    |> required "tags" (Decode.list Decode.string)
    |> required "type" savedItemTypeDecoder
    |> required "createdOn" dateDecoder
    |> required "isRead" Decode.bool
    |> optional "readOn" (Decode.map Just dateDecoder) Nothing

maybeNullEncoder encoder value =
  case value of
  Nothing -> Encode.null
  Just data -> encoder data

savedItemEncoder : SavedItem -> Encode.Value
savedItemEncoder item =
  Encode.object 
    [ ("title", Encode.string item.title)
    , ("link", Encode.string item.link)
    , ("description", maybeNullEncoder Encode.string item.description)
    , ("tags", Encode.list (Encode.string) item.tags)
    , ("type", Encode.string (savedItemTypeEncoder item.itemType))
    , ("createdOn", Encode.int (Time.posixToMillis item.createdOn))
    , ("isRead", Encode.bool item.isRead )
    , ("readOn", maybeNullEncoder (\v -> Encode.int (Time.posixToMillis v)) item.readOn )
    ]