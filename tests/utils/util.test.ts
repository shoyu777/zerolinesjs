import { deleteCloak } from '../../src/utils/initUtils';

describe('deleteCloak for document', () => {
  it('zl-cloakが要素から削除されること', () => {
    // Set up our document body
    document.body.innerHTML =
      '<div>' +
      '  <span id="dummy">dummy1</span>' +
      '  <div id="target1" zl-cloak>111</div>' +
      '  <div id="target2" zl-cloak>222</div>' +
      '</div>';

    // delete前にはzl-cloak属性が存在すること
    const beforeTarget1 = document.getElementById('target1');
    expect(beforeTarget1?.hasAttribute('zl-cloak')).toEqual(true);

    deleteCloak(document);

    const afterTarget1 = document.getElementById('target1');
    expect(afterTarget1?.hasAttribute('zl-cloak')).toEqual(false);
    const afterTarget2 = document.getElementById('target2');
    expect(afterTarget2?.hasAttribute('zl-cloak')).toEqual(false);
  });
});

describe('deleteCloak for specific parent element', () => {
  it('指定した親要素配下の要素のみzl-clockが削除されること', () => {
    // Set up our document body
    document.body.innerHTML =
      '<div id="one">' +
      '  <span id="dummy1">dummy1</span>' +
      '  <div id="target1" zl-cloak>111</div>' +
      '</div>' +
      '<div id="two">' +
      '  <span id="dummy2">dummy2</span>' +
      '  <div id="target2" zl-cloak>222</div>' +
      '</div>';

    const targetParent = document.getElementById('one') as HTMLElement;

    deleteCloak(targetParent);

    const childTarget = document.getElementById('target1');
    expect(childTarget?.hasAttribute('zl-cloak')).toEqual(false);

    const otherTarget = document.getElementById('target2');
    expect(otherTarget?.hasAttribute('zl-cloak')).toEqual(true);
  });
});
