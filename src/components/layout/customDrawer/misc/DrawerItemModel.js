export default class DrawerItemModel {
  constructor(icon, title, actionPageUrl) {
    this._icon = icon;
    this._title = title;
    this._actionPageUrl = actionPageUrl;
  }

  get icon() {
    return this._icon;
  }

  get title() {
    return this._title;
  }

  get actionPageUrl() {
    return this._actionPageUrl;
  }
}
