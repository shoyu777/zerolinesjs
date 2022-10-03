import Tab from '../../src/components/tab';

const tabMarkup =
  '<div id="tab-list" data-zl="tab-list">' +
  '  <button type="button" data-zl="tab-item target-[#tab1] default active-style-[active]">' +
  '    Tab 1' +
  '  </button>' +
  '  <button type="button" data-zl="tab-item target-[#tab2] active-style-[active]">' +
  '    Tab 2' +
  '  </button>' +
  '</div>' +
  '<div id="tab1">' +
  '  Tab1 content' +
  '</div>' +
  '<div id="tab2">' +
  '  Tab2 content' +
  '</div>';

describe('tab', () => {
  it('初期状態でtabコンテンツがdefault以外hiddenとなっていること', () => {
    // Set up our document body
    document.body.innerHTML = tabMarkup;

    const tabList = document.getElementById('tab-list') as HTMLElement;
    const tabContent1 = document.getElementById('tab1') as HTMLElement;
    const tabContent2 = document.getElementById('tab2') as HTMLElement;

    new Tab(tabList);

    // tab1はdisplay-blockとなっていること
    expect(tabContent1.style.display).toEqual('block');
    // tab2はdisplay-noneとなっていること
    expect(tabContent2.style.display).toEqual('none');
  });
});
