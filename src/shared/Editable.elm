module Editable exposing(..)

type EditMode
    = Editing
    | NotEditing

type alias EditableType obj =
    { data : obj
    , mode : EditMode
    }
  
createEditable: a -> (EditableType a)
createEditable a =
   { data = a, mode = NotEditing }