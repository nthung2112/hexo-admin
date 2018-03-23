var React = require('react');
var Link = require('react-router-dom').Link;
var SettingsCheckbox = require('./settings-checkbox');
var SettingsTextbox = require('./settings-textbox');
var createReactClass = require('create-react-class');

var Settings = createReactClass({
  render: function() {
    return (
      <div className="settings" style={{ whiteSpace: 'nowrap' }}>
        <h1>Settings</h1>
        <p>Set various settings for your admin panel and editor.</p>
        <p>
          Hexo admin can be secured with a password.{' '}
          <Link to="/authsetup">Setup authentification here.</Link>
        </p>
        <hr />

        <h2>Editor Settings</h2>
        <SettingsCheckbox
          name="lineNumbers"
          enableOptions={{ editor: { lineNumbers: true } }}
          disableOptions={{ editor: { lineNumbers: false } }}
          label="Enable line numbering."
        />
        <SettingsCheckbox
          name="spellcheck"
          enableOptions={{
            editor: { inputStyle: 'contenteditable', spellcheck: true }
          }}
          disableOptions={{ editor: { inputStyle: null, spellcheck: false } }}
          label="Enable spellchecking. (buggy on older browsers)"
        />
        <hr />

        <h2>Image Pasting Settings</h2>
        <p>
          Hexo-admin allows you to paste images you copy from the web or elsewhere directly into the
          editor. Decide how you'd like to handle the pasted images.
        </p>
        <SettingsCheckbox
          name="askImageFilename"
          label="Always ask for filename."
          style={{ width: '300px', display: 'inline-block' }}
        />
        <SettingsCheckbox
          name="overwriteImages"
          label="Overwrite images if file already exists."
          style={{ width: '425px', display: 'inline-block' }}
        />
        <SettingsTextbox name="imagePath" defaultValue="/images" label="Image directory" />
        <SettingsTextbox name="imagePrefix" defaultValue="pasted-" label="Image filename prefix" />
      </div>
    );
  }
});

module.exports = Settings;
