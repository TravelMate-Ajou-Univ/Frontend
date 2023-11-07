export default function CustomToolbar() {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-header" defaultValue="false">
          <option value="1">제목 1</option>
          <option value="2">제목 2</option>
          <option value="3">제목 3</option>
          <option value="false">일반 텍스트</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-blockquote" />
      </span>
      <span className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-image" />
      </span>
    </div>
  );
}
