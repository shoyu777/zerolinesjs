describe('sample', () => {
  it('sample', () => {
    // コンソールのログ出力を監視し、その文字列を返す
    const log = jest.spyOn(console, 'log').mockReturnValue();

    expect(true).toEqual(true);

    // 'jest.spyOn()' によって作成されたモックをリセット
    log.mockRestore();
  });
});
