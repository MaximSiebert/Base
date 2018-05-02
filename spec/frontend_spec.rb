require 'spec_helper'

describe 'Example theme frontend', theme: 'example', type: :feature, shared_session: true do
  it_behaves_like 'has logo support', image_max_height: 200, selector: '.logo'
  it_behaves_like 'has menu', dropdown_categories: false,
                  menu_item_selector: '.menu .item',
                  category_item_selector: '.menu .category'
  it_behaves_like 'page with social links', selector: '.social-link'
  it_behaves_like 'has gallery support', lazy_load: true
  it_behaves_like 'has listing support', lazy_load: true,
                  title_selector: '.title-element',
                  selector: '.asset'
  it_behaves_like 'has share support'
  it_behaves_like 'has "using format" support'
  it_behaves_like 'has secret pages support'
  it_behaves_like 'has content page support'
end
