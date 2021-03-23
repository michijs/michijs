
export type WidgetRoles =
    | 'button'
    | 'checkbox'
    | 'gridcell'
    | 'link'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'option'
    | 'progressbar'
    | 'radio'
    | 'scrollbar'
    | 'searchbox'
    | 'separator'
    | 'slider'
    | 'spinbutton'
    | 'switch'
    | 'tab'
    | 'tabpanel'
    | 'textbox'
    | 'treeitem';

export type CompositeRoles =
    | 'combobox'
    | 'grid'
    | 'listbox'
    | 'menu'
    | 'menubar'
    | 'radiogroup'
    | 'tablist'
    | 'tree'
    | 'treegrid';

export type DocumentStructureRoles =
    | 'application'
    | 'article'
    | 'cell'
    | 'columnheader'
    | 'definition'
    | 'directory'
    | 'document'
    | 'feed'
    | 'figure'
    | 'group'
    | 'heading'
    | 'img'
    | 'list'
    | 'listitem'
    | 'math'
    | 'none'
    | 'note'
    | 'presentation'
    | 'row'
    | 'rowgroup'
    | 'rowheader'
    | 'separator'
    | 'table'
    | 'term'
    | 'textbox'
    | 'toolbar'
    | 'tooltip';

export type LandmarkRoles =
    | 'banner'
    | 'complementary'
    | 'contentinfo'
    | 'form'
    | 'main'
    | 'navigation'
    | 'region'
    | 'search';

export type LiveRegionRoles =
    | 'alert'
    | 'log'
    | 'marquee'
    | 'status'
    | 'timer';

export type WindowRoles = 'alertdialog' | 'dialog';

export type AllRoles = WidgetRoles | CompositeRoles | DocumentStructureRoles | LandmarkRoles | LiveRegionRoles | WindowRoles

