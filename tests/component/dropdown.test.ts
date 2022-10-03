import DropDown from '../../src/components/dropdown';

const dropdownMarkup =
  '<button id="toggle" type="button" data-zl="dropdown-toggle target-[#dropdown1]">' +
  '  Dropdown Button' +
  '</button>' +
  '<ul id="dropdown1">' +
  '  <li>list item</li>' +
  '</ul>';

describe('dropdown', () => {
  it('初期状態でdropdownメニューがhiddenとなっていること', () => {
    // Set up our document body
    document.body.innerHTML = dropdownMarkup;

    const dropdownToggle = document.getElementById('toggle') as HTMLElement;
    const dropdownMenu = document.getElementById('dropdown1') as HTMLElement;
    const parameter = 'dropdown-toggle target-[#dropdown1]';

    new DropDown(dropdownToggle, parameter);

    expect(dropdownMenu.classList.contains('zerolines_hidden')).toEqual(true);
  });

  it('クリックしたら表示されること', () => {
    // Set up our document body
    document.body.innerHTML = dropdownMarkup;

    const dropdownToggle = document.getElementById('toggle') as HTMLElement;
    const dropdownMenu = document.getElementById('dropdown1') as HTMLElement;
    const parameter = 'dropdown-toggle target-[#dropdown1]';

    new DropDown(dropdownToggle, parameter);

    dropdownToggle.click();
    expect(dropdownMenu.classList.contains('zerolines_hidden')).toEqual(false);
  });

  it('2回クリックしたら非表示になること', () => {
    // Set up our document body
    document.body.innerHTML = dropdownMarkup;

    const dropdownToggle = document.getElementById('toggle') as HTMLElement;
    const dropdownMenu = document.getElementById('dropdown1') as HTMLElement;
    const parameter = 'dropdown-toggle target-[#dropdown1]';

    new DropDown(dropdownToggle, parameter);

    dropdownToggle.click();
    dropdownToggle.click();

    expect(dropdownMenu.classList.contains('zerolines_hidden')).toEqual(true);
  });
});
