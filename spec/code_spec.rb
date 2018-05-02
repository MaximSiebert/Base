require 'spec_helper'

describe 'Example theme code', theme: 'example' do
  it_behaves_like 'structure is correct', version: 2
  it_behaves_like 'coding style is correct'
  it_behaves_like 'has correct v3 variables.yml',
    unused_variables: ["icon1", "icon1text", "icon2", "icon2text", "icon3", "icon3text", "icon4", "icon4text", "icon5", "icon5text"]
  it_behaves_like 'validated assets'
  it_behaves_like 'has correct editor.yml',
    drawerless_variables: %w[logo_type_toggle],
    unconfigured_drawers: %w[code_editor]
end
