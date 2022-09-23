describe('sample', () => {
  it('sample', () => {
    // コンソールのログ出力を監視し、その文字列を返す
    const log = jest.spyOn(console, 'log').mockReturnValue();

    expect(true).toEqual(true);

    // 'jest.spyOn()' によって作成されたモックをリセット
    log.mockRestore();
  });

  it('displays a user after a click', () => {
    // コンソールのログ出力を監視し、その文字列を返す
    const log = jest.spyOn(console, 'log').mockReturnValue();

    // Set up our document body
    document.body.innerHTML =
      '<div>' +
      '  <span id="username" />' +
      '  <button id="button" />' +
      '</div>';

    const button = document.getElementById('button');
    button?.addEventListener('click', function () {
      console.log('hello');
    });
    if (button) button.click();
    // Assert that the fetchCurrentUser function was called, and that the
    // #username span's inner text was updated as we'd expect it to.
    expect(log).toHaveBeenNthCalledWith(1, 'hello');

    // 'jest.spyOn()' によって作成されたモックをリセット
    log.mockRestore();
  });

  it('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });
});
