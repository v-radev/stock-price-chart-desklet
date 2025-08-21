'use strict';

// Cinnamon desklet user interface
const Desklet = imports.ui.desklet;
// Shell toolkit
const St = imports.gi.St;

const UUID = 'stock-price-chart@v-radev';
const DESKLET_DIR = imports.ui.deskletManager.deskletMeta[UUID].path;

imports.searchPath.unshift(`${DESKLET_DIR}/lib`);
const LoggerModule = imports['logger'];
const logger = new LoggerModule.LoggerClass();

logger.setLogger(global.log); // Uncomment to enabled debugging


function StockPriceChartDesklet(metadata, instanceId) {
  this._init(metadata, instanceId);
}

StockPriceChartDesklet.prototype = {
  __proto__: Desklet.Desklet.prototype,

  _init: function(metadata, instanceId) {
    global.log('-- Initializing desklet: ' + metadata.name + ' (Instance: ' + instanceId + ')');
    logger.log('Initializing desklet: ' + metadata.name + ' (Instance: ' + instanceId + ')');
    Desklet.Desklet.prototype._init.call(this, metadata, instanceId);

    this.instanceId = instanceId;
    this.metadata = metadata;

    this._bindSettings();
  },

  _bindSettings: function() {
    this.settings = new Settings.DeskletSettings(this, this.metadata.uuid, this.instanceId);

    // [ Display Settings ]
    this.settings.bind('height', 'height', this.onDisplaySettingChanged);
    this.settings.bind('width', 'width', this.onDisplaySettingChanged);
    this.settings.bind('transparency', 'transparency', this.onDisplaySettingChanged);
    this.settings.bind('backgroundColor', 'backgroundColor', this.onDisplaySettingChanged);
    this.settings.bind('cornerRadius', 'cornerRadius', this.onDisplaySettingChanged);
    this.settings.bind('borderWidth', 'borderWidth', this.onDisplaySettingChanged);
    this.settings.bind('borderColor', 'borderColor', this.onDisplaySettingChanged);

    // [ Data Fetch Settings ]
    this.settings.bind('delayMinutes', 'delayMinutes', this.onDataFetchSettingsChanged);

    // [ Render Settings ]
    this.settings.bind('showLastUpdateTimestamp', 'showLastUpdateTimestamp', this.onRenderSettingsChanged);
    this.settings.bind('showVerticalScrollbar', 'showVerticalScrollbar', this.onRenderSettingsChanged);
    this.settings.bind('manualDataUpdate', 'manualDataUpdate', this.onRenderSettingsChanged);
    this.settings.bind('roundNumbers', 'roundNumbers', this.onRenderSettingsChanged);
    this.settings.bind('decimalPlaces', 'decimalPlaces', this.onRenderSettingsChanged);
    this.settings.bind('strictRounding', 'strictRounding', this.onRenderSettingsChanged);
    this.settings.bind('use24HourTime', 'use24HourTime', this.onRenderSettingsChanged);
    this.settings.bind('customTimeFormat', 'customTimeFormat', this.onRenderSettingsChanged);
    this.settings.bind('customDateFormat', 'customDateFormat', this.onRenderSettingsChanged);
    this.settings.bind('quoteSymbols', 'quoteSymbolsText'); // no callback, manual refresh required
    this.settings.bind('showQuoteName', 'showQuoteName', this.onRenderSettingsChanged);
    this.settings.bind('useLongQuoteName', 'useLongQuoteName', this.onRenderSettingsChanged);
    this.settings.bind('linkQuoteName', 'linkQuoteName', this.onRenderSettingsChanged);
    this.settings.bind('showQuoteSymbol', 'showQuoteSymbol', this.onRenderSettingsChanged);
    this.settings.bind('linkQuoteSymbol', 'linkQuoteSymbol', this.onRenderSettingsChanged);
    this.settings.bind('showTradeTime', 'showTradeTime', this.onRenderSettingsChanged);
    this.settings.bind('fontColor', 'fontColor', this.onRenderSettingsChanged);
    this.settings.bind('scaleFontSize', 'scaleFontSize', this.onRenderSettingsChanged);
    this.settings.bind('fontScale', 'fontScale', this.onRenderSettingsChanged);
    this.settings.bind('uptrendChangeColor', 'uptrendChangeColor', this.onRenderSettingsChanged);
    this.settings.bind('downtrendChangeColor', 'downtrendChangeColor', this.onRenderSettingsChanged);
    this.settings.bind('unchangedTrendColor', 'unchangedTrendColor', this.onRenderSettingsChanged);

    // [ Network Settings ]
    this.settings.bind('sendCustomUserAgent', 'sendCustomUserAgent'); // no callback, manual refresh required
    this.settings.bind('customUserAgent', 'customUserAgent');  // no callback, manual refresh required
    this.settings.bind('enableCurl', 'enableCurl'); // no callback, manual refresh required
    this.settings.bind('curlCommand', 'curlCommand'); // no callback, manual refresh required
  },

  on_desklet_removed: function() {
    logger.log('Removing desklet: ' + this.metadata.name + ' (Instance: ' + this.instanceId + ')');
  },

  on_desklet_added_to_desktop() {
    logger.log('Desklet added to desktop: ' + this.metadata.name + ' (Instance: ' + this.instanceId + ')');

    // creates container for one child
    this.window = new St.Bin();
    // creates a label with test
    this.text = new St.Label({text: "Hello Desktop"});
    // adds label to container
    this.window.add_actor(this.text);
    // Sets the container as content actor of the desklet
    this.setContent(this.window);

    // const scrollView = new St.ScrollView();
    // scrollView.set_policy(Gtk.PolicyType.NEVER, this.showVerticalScrollbar ? Gtk.PolicyType.AUTOMATIC : Gtk.PolicyType.NEVER);
    // scrollView.add_actor(tableContainer);
    //
    // this.mainBox = new St.BoxLayout({
    //   vertical: true,
    //   width: this.width,
    //   height: this.height,
    //   style_class: "quotes-reader"
    // });
    // // override default style with custom settings
    // this.setDeskletStyle();
    //
    // this.mainBox.add(scrollView, {
    //   expand: true
    // });
    // this.setContent(this.mainBox);
  }
};

function main(metadata, instanceId) {
  return new StockPriceChartDesklet(metadata, instanceId);
}
