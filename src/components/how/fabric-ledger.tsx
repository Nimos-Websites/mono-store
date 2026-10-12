const SETTINGS = [
  {
    setting: "Low",
    fabrics: "Silk, acetate, anything thin, anything with a sheen.",
    watch:
      "The two ways low steam goes wrong are a water spot and a crease set into the damp. Hold the plate back from the fabric and keep the garment moving.",
  },
  {
    setting: "Medium",
    fabrics: "Cotton, poplin, wool, and most of what goes out on a working day.",
    watch:
      "The default. Start here. Move up only when a crease does not respond, and move down when the fabric starts to look wet rather than relaxed.",
  },
  {
    setting: "High",
    fabrics: "Linen, heavy cotton, canvas. Creases that have been pressed in and set.",
    watch:
      "High output is where a dry, structured fabric picks up a mark. Work on the reverse, keep the plate off the surface, and let the steam do the work.",
  },
  {
    setting: "No dial",
    fabrics: "Suede, finished leather, rubberised and glued seams.",
    watch:
      "There is no setting for these. The appliance is not the wrong tool for them — it is simply not a tool. Brush, or take it to somebody who does that.",
  },
];

export function FabricLedger() {
  return (
    <div className="ledger" data-reveal>
      <div className="hidden gap-x-8 border-b border-hair py-3 md:grid md:grid-cols-12">
        <p className="label md:col-span-3">Setting</p>
        <p className="label md:col-span-4">Fabrics it starts on</p>
        <p className="label md:col-span-5">What to watch</p>
      </div>

      {SETTINGS.map((row) => (
        <div
          key={row.setting}
          className="grid gap-x-8 gap-y-2 border-b border-hair py-6 md:grid-cols-12 md:py-7"
        >
          <p className="ledger-key md:col-span-3 md:pt-1">{row.setting}</p>
          <p className="body-lg md:col-span-4">{row.fabrics}</p>
          <p className="body md:col-span-5">{row.watch}</p>
        </div>
      ))}
    </div>
  );
}