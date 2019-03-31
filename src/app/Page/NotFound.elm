module Page.NotFound exposing (view)

import Html exposing (..)

view : { title : String, content : Html msg }
view =
    { title = ""
    , content = Html.text ""
    }