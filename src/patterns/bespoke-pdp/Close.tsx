export function Close() {
  return (
    <section className="close-outer">
      <div className="close-page" style={{ height: "30vh" }} aria-hidden />
      <div className="close-reveal">
        <div className="close-inner">
          <svg className="badge" viewBox="0 0 100 100" aria-hidden>
            <defs>
              <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text>
              <textPath href="#circlePath">
                60±2 HRC · HAND-FORGED · US STOCK · THE 67 ·
              </textPath>
            </text>
          </svg>
          <p className="display close-word">Cut something real.</p>
          <p className="close-fine">Superstore · Kelowna, BC · ships from US stock</p>
        </div>
      </div>
    </section>
  );
}
