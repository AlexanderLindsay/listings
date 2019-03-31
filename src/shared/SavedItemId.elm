module SavedItemId exposing (Id (..), decoder, toString, urlParser)

import Json.Decode as Decode exposing (Decoder)
import Url.Parser exposing (Parser)

type Id
  = Id String

urlParser : Parser (Id -> a) a
urlParser =
  Url.Parser.custom "SIID" (\str -> Just (Id str))

decoder : Decoder Id
decoder =
  Decode.map Id Decode.string

toString (Id str) =
  str