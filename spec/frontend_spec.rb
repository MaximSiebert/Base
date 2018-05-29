require 'spec_helper'

describe 'Fabric theme frontend', theme: 'fabric', type: :feature, shared_session: true do
  it_behaves_like 'has logo support', image_max_height: 200, selector: '.logo'
  it_behaves_like 'has menu', dropdown_categories: false,
                  menu_item_selector: '.menu .item',
                  category_item_selector: '.menu .category',
                  wait_callback: proc {
                    find('.mobile-menu-toggle').click
                  }
  it_behaves_like 'page with social links', selector: '.social-desktop .social-link'
  it_behaves_like 'has slideshow gallery support', next_element_selector: '.swiper-button-next',
                  prev_element_selector: '.swiper-button-prev',
                  selector: '.swiper-slide-active',
                  wait_callback: proc { sleep 0.5 }
  it_behaves_like 'has listing support', lazy_load: true,
                  title_selector: '.title-element',
                  selector: '.asset'
  it_behaves_like 'has share support'
  it_behaves_like 'has "using format" support'
  it_behaves_like 'has secret pages support'
  it_behaves_like 'has content page support'
end
