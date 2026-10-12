"use client";

import { BladeHero } from "@/patterns/bespoke-pdp/BladeScene";
import { AnnouncementStrip } from "@/patterns/bespoke-pdp/announce";
import { TheObject, TheProof } from "@/patterns/bespoke-pdp/acts";
import { Configurator } from "@/patterns/bespoke-pdp/Configurator";
import { Action, TheStory } from "@/patterns/bespoke-pdp/Action";
import { Close } from "@/patterns/bespoke-pdp/Close";

export function The67Experience() {
  return (
    <main>
      <AnnouncementStrip />
      <BladeHero />

      <div id="object">
        <TheObject />
      </div>
      <div id="proof">
        <TheProof />
      </div>
      <div id="configurator">
        <Configurator />
      </div>
      <TheStory />
      <div id="offer">
        <Action />
      </div>
      <Close />
    </main>
  );
}

