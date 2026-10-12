# BRAND FUNNEL RESEARCH — 9 October 2026

> **Phase −1 intelligence sweep** for the one-product build (`HANDOFF-ONE-PRODUCT.md`).
> Compiled 9–10 October 2026. Sourcing law: every claim carries the URL it was retrieved from;
> anything that could not be confirmed sits in §8, not in the body.
> All web claims below were retrieved 10 October 2026 from the URLs shown. Internal figures trace
> to `PRODUCT-DECISION.md` and `MARKETING.md` (both 8 October 2026) and to the live catalogue row
> (`app/src/data/products.json`, handle `the-steamer`, SKU CJYD320992601AZ).
> This file is the input to the product dossier (`data/marketing/the-steamer.json`, assembled by the
> research / psychology / data teams in `tools/market/run.mjs`) and to the pain-points-with-evidence
> module on the PDP. **Nothing here authorizes a send, a price change, or an inventory order.**

---

## 1 · PLAYBOOKS — the brands, mechanism per brand, sourced

Twelve one-product / premium-object D2C brands, dissected for funnel mechanics (not aesthetics).
For each: the funnel steps end to end (ad → landing → PDP → ATC → upsell → post-purchase), the offer
architecture, the objection handling, and what the first three seconds do. **Take the mechanism, not
the opinion.**

### 1.1 Dollar Shave Club — the manifesto-video launch

**Funnel.** The 2012 launch video *was* the ad and the landing page. It drove **12,000 orders in the
first 48 hours** and crashed the server in the first hour; production budget **$4,500**; 4.75M views
in the first three months. ([en.wikipedia.org/wiki/Dollar_Shave_Club](https://en.wikipedia.org/wiki/Dollar_Shave_Club),
[youtube.com/watch?v=ZUG9qYTJMsI](https://www.youtube.com/watch?v=ZUG9qYTJMsI),
[nbcnews.com/id/wbna49428347](https://www.nbcnews.com/id/wbna49428347),
[mediashower.com](https://www.mediashower.com/blog/how-dollar-shave-club-beat-gillette-with-one-video))
Today's "How It Works" page is a three-step enrollment page: pick products → choose frequency →
"PAUSE OR CANCEL ANYTIME" ([us.dollarshaveclub.com/pages/how-it-works](https://us.dollarshaveclub.com/pages/how-it-works)).
The PDP buy box carries **three paths**: subscribe / add-to-next-box-once / one-time
([us.dollarshaveclub.com/products/the-signature-6-blade-razor](https://us.dollarshaveclub.com/products/the-signature-6-blade-razor)).
Post-purchase upsell runs on **Disco**; subscription management on Ordergroove
([shopify.com/case-studies/dollar-shave-club](http://shopify.com/case-studies/dollar-shave-club)).

**Offer.** Per-product subscriptions (each item its own subscription, skip/pause any single line);
original mechanic was **$1 first month + $2 shipping** ([digital.hbs.edu](https://digital.hbs.edu/platform-rctom/submission/online-retailing-and-the-dollar-shave-club/index.html));
30-day money-back guarantee; starter-set discount tied to enrollment; free shipping $18+.

**Objection handling (real lines).** "Are the blades any good? No. Our blades are f***ing great."
· "Do you like spending 20 dollars a month on brand name razors? … Your handsome-ass grandfather had
one blade, and polio." · "It's so gentle a toddler could use it." · "Stop paying for shave tech you
don't need" · "We focus on what matters most: sharp, longer-lasting stainless steel blades, not
gimmicky nonsense" ([manifestowriting.com](https://www.manifestowriting.com/database/dollar-shave-club-our-blades-are-fing-great),
[us.dollarshaveclub.com](https://us.dollarshaveclub.com/)).

**First 3 seconds.** YouTube chapter markers: "Introduction to service 0:00 / Razor quality and
features 0:09 / Value proposition 0:17." Script for the opening block: **"Hi, I'm Mike. Founder of
dollar shave club dot com. What is dollar shave club dot com? Well, for a dollar a month we send high
quality razors right to your door. Yeah, a dollar."** Visual beat at 0:00: Dubin striding through a
warehouse, machete in hand, deadpan, past a poster reading "Our Blades Are F***ing Great."
([youtube.com/watch?v=ZUG9qYTJMsI](https://www.youtube.com/watch?v=ZUG9qYTJMsI),
[mediashower.com](https://www.mediashower.com/blog/how-dollar-shave-club-beat-gillette-with-one-video))

**Mechanism to take.** The founder states the price and the deal inside nine seconds, with a prop
that makes the frame memorable. The referral mechanic was on the homepage from launch era — archived
January 2013 copy: **"Earn a free month for every friend you sign up. 1000 friends gets you 83 years
of free razors. …and if you live longer than that, bravo, we'll be happy to keep sending"**
([web.archive.org/web/20130112223510/http://www.dollarshaveclub.com/](https://web.archive.org/web/20130112223510/http://www.dollarshaveclub.com/),
retrieved 10 October 2026 via the CDX API with sleep-spaced calls; the 2020 snapshot
([web.archive.org/web/20200107142230](https://web.archive.org/web/20200107142230)) served a JS shell).
CRO evidence on the buy box: splitting bundles into itemized lines raised subscriptions **+11.2%**;
conversational tone in the first two funnel steps **+5.24%**; showing the one-time price next to the
subscription cut subscription CAC **57%** ([conversion.com/case-study/dollar-shave-club](https://conversion.com/case-study/dollar-shave-club),
[structured.agency](https://structured.agency/case-study/dollar-shave-drop-subscription-cac-through-buybox-optimization)).

### 1.2 Ridge — the warranty as the marketing wedge

**Funnel.** Deliberately **two pages before the PDP**: a CTA on the homepage directs to an education
page ("How Does The Ridge Wallet Compare To Your Old Wallet?" — 4 CARDS / 7 CARDS visual, "OVER 30
COLORS", "50,000 5-STAR REVIEWS & 2 MILLION CUSTOMERS") before pushing to the product page; lifted
conversion from top-of-funnel traffic **15%** ([thedigitalchapter.com](https://www.thedigitalchapter.com/p/growth-marketing-casestudy-ridge-wallet),
[sg.ridge.com/pages/how-it-works](https://sg.ridge.com/pages/how-it-works)).
Capture device (verified first-hand, Sept 2026): a **spin-to-win sweepstakes popup**, timed 17.1s,
vendor Recart, email field behind a yes/no gate ([taylorsicard.com/brands/ridge](https://taylorsicard.com/brands/ridge)).
PDP opens with the two-promise bar **"99-DAY RISK-FREE TRIAL / LIFETIME GUARANTEE"**, then price,
then a feature block that doubles as the guarantee recap, then kit upsells
([ridge.com/products/carbon-fiber](https://ridge.com/products/carbon-fiber)).

**Offer.** **"Built for Life Warranty"** (introduced 14 Oct 2025) covers defects, normal wear, loss,
theft and accidental damage on Wallet / KeyCase / Pen / Phone Case / Curb Chain / Curb Bracelet —
with published replacement fees ($17.95 wallet under $150, $27.95 at $150+, $12.95 others, limit 2×)
and an explicit exclusion list ([ridge.com/pages/warranty-policy](https://ridge.com/pages/warranty-policy)).
⚠️ Ridge's own pages contradict each other on scope and regional pricing (CA $25/$39, AU $30/$47,
older regional text: "does not cover lost, stolen, or disposed of wallets") — both texts are cited in
§8. 99-day trial, kit ladders (Daily Driver Kit $175 from $235; Daily Survival Kit $275 from $420).

**Objection handling.** "it's the last wallet you'll ever own, and the only one you'll ever want" ·
"No more back pain!" · "WE'VE GOT YOU COVERED FOR LIFE… If you're not absolutely in love after 99
days, send it back no questions asked." ([sg.ridge.com/pages/how-it-works](https://sg.ridge.com/pages/how-it-works),
[ridgewallet.ca/pages/evergreen-home-intl](https://ridgewallet.ca/pages/evergreen-home-intl))

**First 3 seconds.** The documented pattern is the **enemy swap**: the first frame shows the old way
failing (bulging wallet, patting pockets, a wallet that won't close), then the product solves it in
the same shot — two objects, one pocket, no voiceover
([paid.social/library/ridge/](https://paid.social/library/ridge/),
[aivideovault.com/ad-teardowns/ridge-wallet/](https://aivideovault.com/ad-teardowns/ridge-wallet/)).
Only **9% of Ridge's active ads are video** (51% image, 40% dynamic DPA/DCO); the longest-running
active creative launched 5 Sept 2024 was live **140+ days**; Ridge launched 500+ ads in one
January–February window and kept only 78 ([foreplay.co/post/the-ridges-ad-auction-analysis](https://www.foreplay.co/post/the-ridges-ad-auction-analysis)).

**Mechanism to take.** A warranty priced and published beat a discount. Wayback archaeology
(two domains queried, sleep-spaced — see §8): the Apr 2021 homepage ran "LIFETIME WARRANTY · FREE 45
DAY RETURNS" and the Dec 2021 PDP nav carried a site-wide **discount code** (HOLIDAY15); by 2026 the
guarantee nearly doubled in length (99 days), migrated into the nav bar, the code disappeared, and
the discount moved to permanent "Warehouse — up to 30% off" framing
([2021 home](https://web.archive.org/web/20210416175302/https://ridge.com/),
[2021 PDP](https://web.archive.org/web/20211207211130/https://ridge.com/products/the-ridge-wallet),
[2023](https://web.archive.org/web/20230501121822/https://ridge.com/),
[2026](https://web.archive.org/web/20260401015652/https://ridge.com/)).

### 1.3 True Classic — creative as the targeting

**Funnel.** No bespoke landing pages — **the category page is the landing page**, with key benefits
on top and the bundle offer above the fold; homepage value prop delivered "in one quick GIF" with CTA
"discover the difference"; a "find my fit" widget takes height/weight/desired fit
([marketingexamined.com/blog/true-classics-funnel](https://www.marketingexamined.com/blog/true-classics-funnel),
[mayple.com](https://www.mayple.com/resources/ecommerce/true-classic-case-study)).
The PDP is a ladder: best-seller strip → 8-image gallery → stats band (70,771 reviews, 4.5★; 7M+
customers) → fit block → **quantity ladder Singles / 3-Pack (Save 47%) / 6-Pack (Save 56%) / 10-Pack
(Save 60%, "Best Deal")** → colour selector → upgrade prompt → "Style It With" cross-sell carousel →
"Compare Fabrics" module → customer-video carousel → **"Why True Classic? 3 Problems We're Solving"**
objection module → reviews ([trueclassictees.com/products/black-crew-neck-tee](https://www.trueclassictees.com/products/black-crew-neck-tee)).
Budget context: **$100,000/day on Meta**, $2–2.5 sales per $1 spent ([marketingexamined.com](https://www.marketingexamined.com/blog/true-classics-funnel), citing Modern Retail / BoF).

**Offer.** 100-Day Made-to-Last Guarantee; Insiders Club at $1/mo (10% off + store credit back);
BNPL; a weekly flash-deals page with live countdown and "% claimed" meters
([trueclassictees.com/pages/weekly-deals](https://www.trueclassictees.com/pages/weekly-deals)).

**Objection handling.** The PDP prints objections as **Problem → Solution** pairs: "Problem: Baggy,
unflattering fit. Solution: Fits that sharpen your look…" / "Problem: Premium brands overcharging.
Solution: Get more for the same price…" Plus a stat-attached claim: "A Fit That Makes 87% Of Guys Feel
More Buff," and the shrinkage objection answered pre-emptively in the care guide ("Fabric will shrink
minimally (5%)…") ([trueclassictees.com/products/black-crew-neck-tee](https://www.trueclassictees.com/products/black-crew-neck-tee)).

**First 3 seconds.** No timestamped teardown exists (see §8). What is verified is the opening
*mechanism*: **broad audience + hyper-specific creative — "let the creatives do the targeting,"**
with ad scripts sourced from a post-purchase survey ("customers answer what pain points or desires
your product solved → turn the top responses into narratives → film those")
([marketingexamined.com](https://www.marketingexamined.com/blog/true-classics-funnel)).

**Mechanism to take.** Volume of angles, not volume of spend; the objection list is a page module,
not an afterthought.

### 1.4 Manscaped — the awkward product sold by objection handling

**Funnel.** Ad → collection → PDP. A persistent trust bar on shop and PDP: **"Money-Back Guarantee ·
Free Shipping Over $49 · 2-Year Warranty"** ([manscaped.com/shop](https://www.manscaped.com/shop)).
The buy box presents **two prices side by side — VIP Member Price $109.99 vs Regular $119.99 — with
the subscription disclosure printed directly beneath**: "The VIP Member Price option enrolls you in a
VIP Package subscription, which includes both a fresh trimmer blade and foil blade refill, billed at
$25.00 + tax every 3 months. Customize or cancel anytime."
([manscaped.com/products/lawn-mower-gen6](https://www.manscaped.com/products/lawn-mower-gen6))
The PDP cross-sell is built as **a 4-step routine (Trim → Clean & Exfoliate → Shave → Comfort &
Soothe)** with an Add button on the consumable used in each step — replenishment disguised as
education. Post-purchase: Members Only Rewards, three tiers, with the top tier entered by
subscribing ([manscaped.com/pages/members-only](https://www.manscaped.com/pages/members-only)).

**Offer.** Two-tier warranty: 2-year standard on every electric device; **VIP Protection Warranty**
for subscribers (one claim per 12 months if a replenishment box arrived within 90 days)
([manscaped.com/pages/product-offer-warranty-return](https://www.manscaped.com/pages/product-offer-warranty-return)).

**Objection handling.** The signature device is **the disclaimer printed beside the claim**:
"SkinSafe® Blade Technology… *SkinSafe® technology does not guarantee cut protection"; "Waterproof…
**IPX7 rated to protect against immersion in up to one meter of fresh water for up to 30 minutes**"
with a dedicated /pages/waterproof explainer. The CMO on category credibility: "our brand tone… was
also a sigh of relief in this category where everything was so technical, all about [revolutions per
minute] and ceramic blades" ([marketingdive.com](https://marketingdive.com/news/how-manscapeds-cmo-tackles-super-bowl-sized-brand-ambitions/802780)).

**First 3 seconds.** "The Boys" campaign opens on **two identically unkempt miniature "boys" happily
bobbing up and down the beach alongside their full-size male counterpart** — the visual metaphor is
the whole device ([manscaped.com newsroom](https://www.manscaped.com/blogs/newsroom/manscaped%C2%AE-debuts-new-brand-campaign-paying-homage-to-one-of-the-world-s-greatest-love-stories-men-and-their-boys)).

**Mechanism to take.** State the limit of every claim on the page, next to the claim. The
subscription's price and cadence live in the buy box, not in the fine print.

### 1.5 Casper — the quiz-gated offer

**Funnel.** Homepage → **email-gated 2-minute quiz** → PDP arrives pre-sold. The quiz page asks for
the email *before* the first question ("Where should we send your results?"), and the product page it
lands on opens with "**QUIZ RESULTS — Your perfect match is here!**"
([casper.com/pages/mattress-quiz](https://casper.com/pages/mattress-quiz),
[casper.com/products/casper-dream-hybrid](https://casper.com/products/casper-dream-hybrid)).
The PDP runs model-switch upsells inline ("Snow +$375", "Dream Max +$825"), a size ladder anchored
against "Comp. Value" (Queen $1,495 against $1,995), and two bundle modules (cover +$99; "Complete
your bed" +$119) ([casper.com/products/casper-dream-hybrid](https://casper.com/products/casper-dream-hybrid)).

**Offer.** 100-night trial with a published 30-night adjustment period; return copy that removes
guilt and friction: "**No, you don't have to squeeze it back in the box.** … Our team will try their
best to donate your product to a charity or recycle it" ([casper.com/pages/trial](https://casper.com/pages/trial)).
Nine named bundles plus "Build Your Own Bundle & Save 25%"; two-sided referral ("Give 30% off, get
30% off"); 10-year limited warranty ("Decade of durability"). The honest cost of that guarantee:
**$81M in refunds, returns and discounts in 2018** ([npr.org](https://www.npr.org/2020/01/17/797100231/the-cost-of-free-casper-pays-a-price-for-generous-mattress-returns)).

**Objection handling.** "We believe you should sleep on your mattress to decide if you like it, and
it can take up to two weeks to adjust" — the try-before-buying objection converted into the offer
itself ([casper.ca/en/trial](https://casper.ca/en/trial)); "92% of customers keep their mattress.*";
fiberglass question answered in the site's own FAQ ([casper.com](http://www.casper.com/)).

**Mechanism to take.** Capture before you pitch; sell one recommendation, not a catalogue. Budget
the guarantee as a line item. Wayback: the same site went from **one unpriced mattress in 2014**
([web.archive.org/web/20141001212245](https://web.archive.org/web/20141001212245/https://casper.com/))
to a three-tier matrix with a defined "Comp. Value" anchor and a dated promo calendar by 2026
([web.archive.org/web/20260401161127](https://web.archive.org/web/20260401161127/https://casper.com/)) —
the trial's *length* never changed in 12 years, only its register. That is the part worth copying.

### 1.6 Yeti — the story that withholds the product

**Funnel.** Pursuit-based navigation ("Shop By Activity": Tailgating, Beach, Camping, Fishing,
Hunting) rather than product taxonomy; homepage hero is video; post-purchase is **Register Your
Gear** + warranty claim flow ([yeti.com](https://www.yeti.com/),
[yeti.com/register-product.html](https://www.yeti.com/register-product.html)). Content head Harrison
Lindsey: "our first [priority] is telling a good story about a really good person" — much of the
film output "barely ever features and basically never mentions their product"
([oswegostudios.com](https://oswegostudios.com/case-study-the-yeti-cooler-marketing-model/)).
Early paid programming targeted "prosumers" — VP Marketing Corey Maynard: those commercials "would
reach 100,000 or so hardcore hunters and fishermen who would be the person within their circle of
friends who their buddies would ask about the latest gear" (same URL).

**Offer.** Five-year warranty on a published product list (Tundra, Roadie, TANK, Rambler, Hopper…),
conditional on original owner, authorised dealer, proof of purchase, intended use
([uk.yeti.com/pages/faq](https://uk.yeti.com/pages/faq)). No subscription by design; retention is
**drop discipline** — colour launches, seasonal assortments, limited editions
([umbrex.com](https://umbrex.com/resources/company-profiles/yeti/)).

**The craft story.** Process as hero (roto-moulded one-piece shell, "up to 3 inches of polyurethane
foam insulation"), and — the single most transferable move — **the refusal to claim**: "because of…
the lack of an industry standard for measuring ice retention, claims that place a definite time (5,
10, 14 days) are often based on testing conditions and not real-life situations"; "we believe it is
misleading to make specific claims about how long a cooler will hold ice"
([yeti.com/tundra-faq.html](https://www.yeti.com/tundra-faq.html),
[au.yeti.com/pages/frequently-asked-questions](https://au.yeti.com/pages/frequently-asked-questions)).

**First 3 seconds.** An early ad showed **a grizzly bear attacking and failing to open a YETI
cooler** ([thecaseforbrand.beehiiv.com](https://thecaseforbrand.beehiiv.com/p/yeti-used-community-marketing-storytelling-make-coolers-status-symbol-build-338b-brand)).

**Mechanism to take.** A named, testable spec plus a published "here is what we will not claim" is
stronger trust than a bigger number. Status comes from the tribe, not the object.

### 1.7 Solo Stove — manufacture the question, then answer it

**Funnel.** Campaign 1, "Snoop Goes Smokeless" (Nov 2023): four days of cryptic social posts
establishing the question "Why did Snoop Dogg stop smoking?" **before** the first national TV spot
answered it; a 30+ asset cascade over 13 days "prioritizing the hardest working, dialogue-driven
assets featuring Snoop first, then dwindling… to end on an ASMR top-view of the Solo Stove." Results:
2.5× unaided brand awareness, **22% reduction in CAC, 365% increase in email subscriptions**, Amazon
+195% / Google +167% shopping search
([oneclub.org](https://www.oneclub.org/awards/theoneshow/-award/52420/snoop-goes-smokeless/),
[retailtouchpoints.com](https://www.retailtouchpoints.com/topics/digital-marketing/snoop-dogg-sparks-brand-awareness-lowers-acquisition-costs-for-solo-stove)).
The Bonfire PDP is a spec-and-warranty page: "The World's Most Popular Smokeless Fire Pit",
"Lifetime Product Warranty", FAQ answered inside the PDP, plus a cart-stage disclosure: "your order
will arrive in a box that displays the name and a photo of the product"
([solostove.com/en-us/p/solo-stove-bonfire](https://www.solostove.com/en-us/p/solo-stove-bonfire)).
Registration is built into the product — a QR code in the manual
([solostove.com help center](https://www.solostove.com/us/en-us/help-center)).

**Offer.** Lifetime warranty framed as a brand promise: "**We want your Solo Stove to be the last one
you ever owned.**" Bundle ladder from $329 base to $629.99 Backyard Bundle; accessory ladder
positioned as capability unlocks (Lid, Shield, Stand, Shelter, grill tops).

**Objection handling.** The honesty hedge that protects the claim: "'Smokeless' means engineered to
significantly reduce visible smoke under normal use, **not zero smoke in all conditions**"
([solostove.com help center](https://www.solostove.com/us/en-us/help-center)).

**First 3 seconds.** The :30 spot "opens with a serious Snoop parting ways with smoke. The camera
pulls back to reveal the rapper sitting in front of his smokeless fire pit. It ends with Snoop
roasting a marshmallow" ([musebyclios.com](https://musebyclios.com/music/snoop-goes-smokeless-for-his-solo-stove-fire-pit/)).

**Mechanism to take.** Own a mechanism with a name (Signature 360° Airflow™, secondary burn) and
publish its physics; pre-roll mystery converts better than pre-roll product.

### 1.8 Caraway — the waitlist that launched the brand

**Funnel.** Founder Jordan Nathan: "Prior to launch, we built a **150,000 person wait list**, which
we started building like six months prior. Throughout the R&D cycle, we'd send them updates, maybe
some 3D print images… for our launch we had **200 or 300 influencers post in the first week**… I
don't think we actually started running Meta or Google Ads for a couple of weeks"
([honestecommerce.com](https://honestecommerce.com/blogs/episodes/turning-investor-no-s-into-new-networking-leads-jordan-nathan-caraway-home)).
The counter-positioning: "every brand in the space was focused on cooking and food and we actually
went the complete opposite direction. All of our photography was products built as sculptures. We
only worked with interior design and lifestyle influencers. **We didn't touch food. We didn't show
food.**" (same URL; [shopify.com/blog](https://www.shopify.com/blog/caraway-cookware-stand-out-marketing)).
Retention: a defined 60–90 day window to convert a cookware buyer into a multi-SKU household
([d2c-times.com](https://d2c-times.com/how-caraway-rebuilt-its-growth-engine-to-scale-past-300m/)).

**Offer.** Bundle ladder $395 12-piece → 24-piece → 31-piece; **warranty split by material — 1 year
on ceramic coating, lifetime on stainless/cast iron** (reviewers read the split as a confidence
signal: [sustainablykindliving.com](https://sustainablykindliving.com/caraway-ceramic-cookware-review/)).
Referral redesigned away from discounts toward "**access rewards** — early product drops,
behind-the-scenes content, and priority waitlist placement for limited colorways" — "the new model
tied referral rewards to identity and exclusivity rather than price reduction"
([d2c-times.com](https://d2c-times.com/how-caraway-rebuilt-its-growth-engine-to-scale-past-300m/)).

**The craft story.** Founder origin is a medical incident (Teflon fumes), third-party testing by a
named lab ("SGS — the same company the FDA uses"), and an **escalating test count** — "the first
brand to test its non-stick coating for over 600 forever chemicals — more than anyone else in the
industry" ([carawayhome.com/our-story](https://www.carawayhome.com/pages/our-story)).

**Unboxing as media.** "Even the fully recyclable, all-cardboard packaging is attractively designed
and a pleasure to unbox" ([hgtv.com](https://www.hgtv.com/shopping/product-reviews/caraway-cookware-review));
"The box had inserts with cutouts for each pan… The lids were also wrapped up individually in thick
paper" ([thecandidcooks.com](https://www.thecandidcooks.com/product-review-caraway-cookware-essential-set/));
"your box will include storage racks and a canvas holder for the 3 lids, meant to be installed inside
a cabinet door… two small cork trivets packaged along with the use and care booklet"
([thedailykitchen.co](https://thedailykitchen.co/caraway-ceramic-cookware/)) — and the storage kit is
a craft argument, not a freebie: the magnetic racks keep pans separated, "preventing coating-on-coating
contact that accelerates wear" ([sustainablykindliving.com](https://sustainablykindliving.com/caraway-ceramic-cookware-review/)).
The comparison that names the mechanism: "From the way it's packaged, Caraway gives you an immediate
high-quality impression, much like the one you get when you open a new iPhone"
([thedailykitchen.co](https://thedailykitchen.co/caraway-ceramic-cookware/)).

### 1.9 Our Place — scarcity as an operating system

**Funnel.** Waitlist as the demand engine: 30,000+ at 2019 launch, later reported at 60,000; the pan
**sold out ~30 separate times** — one analysis reads the sellouts as mechanism: "Scarcity plus a good
story equals demand; a thing you can't get always looks better than a thing you can. The waitlist
wasn't a bug in the supply chain so much as a demand-generation mechanism"
([thekitchn.com](https://www.thekitchn.com/shiza-shahid-our-place-23117964),
[today.com](https://www.today.com/shop/always-pan-2-0-review-t283409),
[yespress.io](https://yespress.io/our-place) — the last is an opinion piece, cited as framing).
Colour scarcity stated outright: "The colors are not all here to stay, so if you do have a favorite,
we recommend getting it before it's gone." (same Kitchn URL) Homepage: "100 Day Trial", free shipping
$135+, a press logo wall (Bon Appétit, AD, Vogue), and a **quote wall of short buy-ready one-liners**
("Doing the job of eight traditional cookware pieces") ([fromourplace.com](https://fromourplace.com/)).

**Offer.** 100-day trial + free returns; referral (referrer 200 points ≈ $20, referred gets $20 off
$100+); loyalty "Dirty Dishes Club", 1 point per $1 with published redemption tiers
([fromourplace.com/pages/program-specific-terms](https://fromourplace.com/pages/program-specific-terms)).
Upgrade-generation mechanic on 2.0 launch: existing owners got the new model for **$35 off** via an
emailed coupon ([nbcnews.com](https://www.nbcnews.com/select/shopping/our-place-always-pan-launch-ncna1304235)).

**Objection handling.** Borrowed authority from named chefs: Kenji López-Alt — "The surface is all
clad with titanium, which is naturally non-stick. **It's not precious. It's not fragile, it's just
durable.**" Mike Bagale, chef with three Michelin-starred kitchens behind him — "it's also indestructible… Your car
is going to break down before this." ([fromourplace.com](https://fromourplace.com/)).

**Mechanism to take.** Say the scarcity out loud and mean it; let the product be photographed in a
life, not on a white background.

### 1.10 Great Jones — the channel is the brand

**Funnel.** Instagram was the entire funnel, including support: "Instagram is where the majority of
our customers discover us… It's also where customers come for customer support through their DMs…
If it's not happening on Instagram, it doesn't exist in our universe." The shopping-tag insight —
**the product doesn't have to be in the frame**: "It's great to have a photo where our product isn't
at the forefront. Maybe a photo of someone's kitchen… but it's very easy for our customers to identify
our product" ([fastcompany.com](https://www.fastcompany.com/90433776/turning-followers-into-customers-one-tap-at-a-time)).
Launch was serialized: "six weeks before our launch date, we posted our teaser site and started
sharing a peek of our designs on social media (it was basically a cookware striptease)"
([bonappetit.com](https://www.bonappetit.com/story/sierra-tishgart-great-jones-cookware)).
Recurring content frameworks fight feed fatigue: "There's great power in the repetition of story
frameworks" (Fast Company, same URL). Streetwear-style collab drops sold out over a weekend — Lisa
Says Gah Dutch Oven $190, Dutch Baby $150 ([glossy.co](https://www.glossy.co/fashion/how-great-jones-made-its-cookware-a-fashion-statement/)).

**Offer.** Price-positioning against legacy is the whole offer: $145 Great Jones Dutch oven vs "Le
Creuset, which charges upward of $300 for a similar Dutch oven"; "A Staub 'deep oven'… is $370 at
Williams-Sonoma compared with Great Jones's offering at less than half the price"
([techcrunch.com](https://techcrunch.com/2018/11/19/move-over-le-creuset-a-new-cookware-startup-founded-by-and-for-millennials-is-getting-down-to-business/),
[fastcompany.com](https://www.fastcompany.com/90903736/great-jones-millennial-cookware-brand-acquired-meyer/)).

**Unboxing as media — the best-documented packaging system of the twelve**, from the designer's own
case study: cookware "arrives in colorful, instantly recognizable packaging that stands out from
other boxes on the stoop"; the 'Family Style' suite "comes packed in a special sleeve that wraps
around the three boxes, with an illustration that turns the stack into an oven (the tri-colors of the
layered boxes suggest spumoni cookies)"; each box announces "**Your ware is here!**"; "each piece
comes packaged with a **care card, potholder and refrigerator magnets. The care card unfolds to
explain the step-by-step process of using the piece**, outlined in hand-drawn instructions"
([pentagram.com/work/great-jones](https://www.pentagram.com/work/great-jones)).

**Mechanism to take.** The unboxing can carry the instruction manual — the protocol ships in the
box. Heritage ("a nod to the cookbook editor Judith Jones") chosen over "disruption" positioning.

### 1.11 Bombas — the mission, made operational

**Funnel.** Ad → homepage with an immediate 20%-off email modal — a documented teardown records the
cost of that first move: "I was disappointed when I was immediately presented with a pop-up modal to
give out my email address and get 20% off… I had to intentionally click on the wording 'I reject my
20% off'" ([thegood.com/insights](https://thegood.com/insights/case-study-how-to-convert-first-time-visitors-like-bombas/)).
The cart is the best documented of the twelve: a **dynamic free-shipping bar** ("Score. Your order
qualifies for free US shipping"), complementary cross-sell, an empty-cart state used to teach the
shipping policy, and a "Make It A Gift?" toggle
([dtcpatterns.com](https://www.dtcpatterns.com/dtc-patterns-articles/why-this-sock-companys-cart-works-harder-than-yours),
[hren.io/teardowns/bombas](https://hren.io/teardowns/bombas)).
The welcome series **withholds the discount until day 2** in the 2026 capture — it surfaces first in
the risk-reversal email ([mailpotion.com](https://mailpotion.com/blog/bombas-welcome-series-2024-vs-2026)).

**Offer.** "**ONE PURCHASED. ONE DONATED.**" — and the disclosure that makes it credible rather than
a slogan: "we donate the corresponding item **within 12 months of the sold date**," a four-step
process in the brand's own verbs (WE BUY MATERIALS / WE DO MATH / WE ASK WHEN / WE SHIP), 4,000+
vetted Giving Partners, "Bombas handles all transportation logistics and shipping costs"
([bombas.com/pages/giving-back](https://bombas.com/pages/giving-back),
[beebetter.bombas.com/impact](https://beebetter.bombas.com/impact)).
**100% Happiness Guarantee**: 30-day refunds, then "free exchanges, replacements, or store credit —
**no matter the condition**" ([bombas.com/pages/about-us](https://bombas.com/pages/about-us)).
The published donation counter reads 200,000,000+ items
([beebetter.bombas.com/impact](https://beebetter.bombas.com/impact)).

**Mechanism to take.** A mission undercuts itself unless the operations are published. The mobile
PDP critique from the same teardown is the inverse warning: price hidden, no reviews, and a floating
20% pill overlapping the size picker "exactly where the thumb lands to pick a size"
([hren.io](https://hren.io/teardowns/bombas)).

### 1.12 Wildgrain — the interstitial that sells before the catalogue

**Funnel.** The landing page is a **5-question quiz**, not a product grid, with persuasion interleaved
between questions: "Did you know? Our breads are slow-fermented for **20+ hours (vs. 20 minutes for
store-bought)**… leads to easier digestion, better nutrient absorption, and lower blood sugar spikes."
Question 1 of 5 is "What brings you to Wildgrain? Select 2 that apply," and one of the options is
"**I'm just here for the free croissants!**" ([wildgrain.com](https://wildgrain.com), read live 10
October 2026).

**Offer.** The free-item-for-life hook ("Get free croissants for life when you sign up"), a box-size
ladder — **4 items / 6 items (+ free item) / 8 items (Save 13% + free item) / 12 items (Save 23% +
free item)** — delivered "on a flexible subscription" with "**free shipping always included**" and
"Reschedule or cancel any time"; 40,000+ five-star reviews; "For every order, 2 meals are donated…
at no extra cost" (1,000,000+ meals donated) ([wildgrain.com](https://wildgrain.com), same fetch).

**Mechanism to take.** The quiz's mid-funnel moments are the sales page. For a one-product brand,
the equivalent is: state the mechanism (why the category fails) *between* the steps of the buyer's own
diagnosis, then present one system. Note: the full ladder terms sit behind signup — the trial length
and box pricing beyond the hub page were not captured (§8).

---

## 2 · FUNNEL ANATOMY — the six winning shapes, with named examples

Every brand in §1 is one of six shapes. The shape is the decision; everything else is configuration.

### Shape 1 — The manifesto-video launch (one product, one price, one action)
**Ad → landing page (the video IS the page) → PDP → ATC → referral → post-purchase.**
Dollar Shave Club: 90 seconds, $4,500, 12,000 orders in 48 hours
([youtube.com/watch?v=ZUG9qYTJMsI](https://www.youtube.com/watch?v=ZUG9qYTJMsI),
[en.wikipedia.org/wiki/Dollar_Shave_Club](https://en.wikipedia.org/wiki/Dollar_Shave_Club)).
Best for: a category with an obvious villain (our case: the $29.70 disposable steamer).
Take: the price and the deal inside the first 10 seconds; the referral line verbatim from launch era
([web.archive.org 2013](https://web.archive.org/web/20130112223510/http://www.dollarshaveclub.com/)).

### Shape 2 — The warranty-wedge engine (guarantee as the hero claim)
**Ad → education page → PDP (guarantee in the header bar) → kit upsell → email list → repeat.**
Ridge: two-page pre-PDP education lifted conversion 15%; 99-day trial + Built for Life; 500+ ads
launched in a fortnight, 78 kept; longest runner 140+ days
([thedigitalchapter.com](https://www.thedigitalchapter.com/p/growth-marketing-casestudy-ridge-wallet),
[foreplay.co](https://www.foreplay.co/post/the-ridges-ad-auction-analysis)).
**This is our shape** — a 3-year warranty is the wedge, and the education page is `/how` in
MARKETING.md §3.

### Shape 3 — Creative-as-targeting at volume (one product, infinite angles)
**Ad (hundreds of angles) → category/collection page as landing → PDP ladder → checkout upsells →
post-purchase survey → next round of angles.**
True Classic: $100K/day, "let the creatives do the targeting," scripts sourced from post-purchase
surveys ([marketingexamined.com](https://www.marketingexamined.com/blog/true-classics-funnel),
[mayple.com](https://www.mayple.com/resources/ecommerce/true-classic-case-study)).
Take: the survey→narrative→script loop is the content engine; measured per §5 (revenue per piece,
not creator count).

### Shape 4 — The quiz-gated recommendation (capture first, one answer second)
**Ad → homepage → email-gated quiz → PDP pre-sold ("QUIZ RESULTS") → bundle ladder → referral.**
Casper and Wildgrain ([casper.com/pages/mattress-quiz](https://casper.com/pages/mattress-quiz),
[wildgrain.com](https://wildgrain.com)). Best for: buyers who don't know which variant they need.
Take for us, inverted: our buyer already owns the failed variant — the quiz is unnecessary; the
failure-mode search page replaces it (MARKETING.md §5 Tier 1).

### Shape 5 — The waitlist/drop engine (scarcity as an operating system)
**Teaser → waitlist with R&D updates → launch-week influencer wave → sellouts → colour/limited drops.**
Caraway (150K waitlist, 6 months of 3D-print updates, 200–300 influencers launch week), Our Place
(~30 sellouts as demand mechanism), Great Jones (6-week "cookware striptease", weekend sellout collab
drops) ([honestecommerce.com](https://honestecommerce.com/blogs/episodes/turning-investor-no-s-into-new-networking-leads-jordan-nathan-caraway-home),
[thekitchn.com](https://www.thekitchn.com/shiza-shahid-our-place-23117964),
[bonappetit.com](https://www.bonappetit.com/story/sierra-tishgart-great-jones-cookware)).
Take: honesty law — we have no 250 units of mystery; the batch framing must stay true to real stock
(PRODUCT-DECISION.md: 250 units ordered, weekly re-order decision).

### Shape 6 — The replenishment system (hardware front, consumables back)
**Ad → PDP with disclosed subscription in the buy box → refill cadence → loyalty tiers.**
DSC (per-product subscriptions, 3-way buy box), Manscaped (VIP price + inline disclosure, routine
cross-sell) ([us.dollarshaveclub.com](https://us.dollarshaveclub.com/),
[manscaped.com/products/lawn-mower-gen6](https://www.manscaped.com/products/lawn-mower-gen6)).
**Not our shape** — no consumables in a steamer. What transfers is the *disclosure* pattern: whatever
we sell after the unit (replacement case parts, per MARKETING.md §4 OWN state) is priced and cadenced
in plain text at the point of sale, never in the fine print.

**A layer, not a shape:** mission (Bombas "one purchased, one donated" with published 12-month
mechanics; Wildgrain's 2 meals per order) sits *on* a shape. It is not a funnel. MONO does not have a
mission layer and should not invent one (§7).

---

## 3 · OFFER ARCHITECTURE — the patterns that work

### 3.1 Bundle ladders (four proven families)
| Family | Named example | The mechanism | Source |
|---|---|---|---|
| Quantity multipack | True Classic Singles → 3 → 6 → 10-Pack ("Save 47/56/60%") | Deepest discount at the largest pack, "Best Deal" flagged | [trueclassictees.com](https://www.trueclassictees.com/products/black-crew-neck-tee) |
| Box-size tiers | Wildgrain 4 / 6 (+free item) / 8 (Save 13%) / 12 (Save 23%) | Free item inserted as the mid-tier sweetener | [wildgrain.com](https://wildgrain.com) |
| Kit builder | Ridge "Wallet Only / Full Kit", add KeyCase 22% off, add Pen 30% off; Daily Driver Kit $175 from $235 | PDP *constructs* the bundle live with per-item discounts | [ridge.com/products/carbon-fiber](https://ridge.com/products/carbon-fiber) |
| Capability ladder | Solo Stove Lid → Shield → Stand → Shelter → grill tops; base $329 → Backyard Bundle $629.99 | Accessories sold as unlocks, not add-ons | [solostove.com](https://www.solostove.com/en-us/p/solo-stove-bonfire) |

### 3.2 Guarantees (length is the product)
| Brand | Guarantee | Notable term | Source |
|---|---|---|---|
| Dollar Shave Club | 30-day money-back | — | [us.dollarshaveclub.com](https://us.dollarshaveclub.com/) |
| Ridge | **99-day risk-free trial** + Built for Life | Free shipping & returns both ways; warranty covers loss/theft for a published fee | [ridge.com/pages/warranty-policy](https://ridge.com/pages/warranty-policy) |
| True Classic / Our Place | 100-day | "if it doesn't fit right or wears a little too soon, we'll replace it no questions asked" | [trueclassictees.com](https://www.trueclassictees.com/products/black-crew-neck-tee), [fromourplace.com](https://fromourplace.com/) |
| Casper | 100-night trial | **Published 30-night adjustment period**; "No, you don't have to squeeze it back in the box" | [casper.com/pages/trial](https://casper.com/pages/trial) |
| Bombas | 100% Happiness Guarantee | After the refund window: "free exchanges, replacements, or store credit — **no matter the condition**" | [bombas.com/pages/about-us](https://bombas.com/pages/about-us) |
| Yeti / Solo Stove / Casper | 5-year / lifetime / 10-year | Registration (Yeti) and QR-in-manual (Solo Stove) at delivery | [uk.yeti.com/pages/faq](https://uk.yeti.com/pages/faq), [solostove.com](https://www.solostove.com/us/en-us/help-center) |

**The cost is real and worth budgeting:** Casper's refunds, returns and discounts were **$81M in
2018** ([npr.org](https://www.npr.org/2020/01/17/797100231/the-cost-of-free-casper-pays-a-price-for-generous-mattress-returns)).
PRODUCT-DECISION.md already budgets our version: expect an 8–12% return rate, not 3%.

### 3.3 The limit-of-claim pattern (strongest trust device found)
The premium brands publish what they will **not** claim, next to the claim:
Yeti ("we believe it is misleading to make specific claims about how long a cooler will hold ice"),
Solo Stove ("'Smokeless' means… not zero smoke in all conditions"), Manscaped ("*SkinSafe® technology
does not guarantee cut protection"), Caraway (third-party lab named, test counts published),
Casper ("Comp. Value" defined in a disclosure module) —
[yeti.com](https://www.yeti.com/tundra-faq.html), [solostove.com](https://www.solostove.com/us/en-us/help-center),
[manscaped.com](https://www.manscaped.com/shop), [carawayhome.com](https://www.carawayhome.com/pages/our-story),
[casper.com](https://casper.com/shop). **Adopted wholesale for MONO in §7.**

### 3.4 Referral without margin damage
DSC at launch: "Earn a free month for every friend you sign up" (free product, not cash)
([web.archive.org 2013](https://web.archive.org/web/20130112223510/http://www.dollarshaveclub.com/));
Casper "Give 30% off, get 30% off"; Our Place $20/$20 with published terms; **Caraway deliberately
redesigned referral away from discounts toward "access rewards — early product drops,
behind-the-scenes content, and priority waitlist placement"** because discount-referral "erode[s]
margin and brand equity" ([d2c-times.com](https://d2c-times.com/how-caraway-rebuilt-its-growth-engine-to-scale-past-300m/)).
The Caraway redesign is the one compatible with our no-discount law (MARKETING.md §4).

### 3.5 What we refuse, and why
| Pattern | Used by | Why MONO refuses |
|---|---|---|
| Dated promo calendar / percent-off sitewide | Casper (expiring birthday/spring sales), Ridge ("Warehouse — up to 30% off") | MARKETING.md §4: no discount mechanic, ever; first hundred customers set the reference price |
| Flash-deal countdowns + "% claimed" meters | True Classic weekly deals | Trains the ICP to wait; we sell to people who already bought the cheap one |
| Review volume as proof | True Classic (70,771 reviews), Ridge (100,000+ 5-star) | We have zero reviews; a new brand quoting borrowed volume is the token swap this whole brief exists to prevent |

---

## 4 · COPY PATTERNS — ten objection-handling lines, source per line

Ten lines that survived contact with a market. Column 2 names the objection; column 4 is the
mechanism to steal (not the words).

| # | Line (verbatim) | Objection it kills | Source | Mechanism |
|---|---|---|---|---|
| 1 | "Are the blades any good? No. Our blades are f***ing great." | Is it any good? | [manifestowriting.com](https://www.manifestowriting.com/database/dollar-shave-club-our-blades-are-fing-great) | Pre-ask the question, then answer negative-then-positive |
| 2 | "Do you like spending 20 dollars a month on brand name razors? … Your handsome-ass grandfather had one blade, and polio." | Why pay for features? | same | Reframe the incumbent's feature list as a liability |
| 3 | "It's so gentle a toddler could use it." | Is it safe? | same | Absurd understatement; lets the reader finish the joke |
| 4 | "it's the last wallet you'll ever own, and the only one you'll ever want" | I'll have to buy another one | [sg.ridge.com/pages/how-it-works](https://sg.ridge.com/pages/how-it-works) | Convert the repeat-purchase objection into a terminal purchase |
| 5 | "WE'VE GOT YOU COVERED FOR LIFE… If you're not absolutely in love after 99 days, send it back no questions asked." | What if it's wrong for me? | [ridgewallet.ca/pages/evergreen-home-intl](https://ridgewallet.ca/pages/evergreen-home-intl) | Stack the warranty on top of the trial, in one breath |
| 6 | "Problem: Baggy, unflattering fit. → Solution: Fits that sharpen your look and boost your confidence." | Will it fit / work for me? | [trueclassictees.com](https://www.trueclassictees.com/products/black-crew-neck-tee) | Print objections on the PDP as Problem→Solution pairs |
| 7 | "SkinSafe® Blade Technology… *SkinSafe® technology does not guarantee cut protection." | Is the claim real? | [manscaped.com/shop](https://www.manscaped.com/shop) | Publish the limit of the claim beside the claim |
| 8 | "we believe it is misleading to make specific claims about how long a cooler will hold ice" | You're cherry-picking numbers | [yeti.com/tundra-faq.html](https://www.yeti.com/tundra-faq.html) | Refuse the vanity number; earn the rest |
| 9 | "'Smokeless' means engineered to significantly reduce visible smoke under normal use, not zero smoke in all conditions." | Marketing speak? | [solostove.com help center](https://www.solostove.com/us/en-us/help-center) | Define the product claim in operating conditions |
| 10 | "No, you don't have to squeeze it back in the box." | Returns are a hassle | [casper.com/pages/trial](https://casper.com/pages/trial) | Answer the physical friction inside a parenthetical |

**Runner-up lines for the failure-mode content (MARKETING.md §5 Tier 1):** Yeti's owner's-manual
voice — "YETI makes the world's best coolers… No other cooler is as durable. No other cooler keeps
ice longer. No other cooler compares." ([eu.yeti.com/pages/tundra-owners-manual](https://eu.yeti.com/pages/tundra-owners-manual))
— shows how far pure claim language can go *after* the FAQ has earned it. And DSC's still-live
middleman line: "NO MIDDLEMAN MARKUPS — We make our blades and ship them straight to you."
([us.dollarshaveclub.com](https://us.dollarshaveclub.com/)).

---

## 5 · MEDIA PATTERNS — the first three seconds, and the six formats

### 5.1 What wins in the first three seconds (verified beats)
| Brand | Verified opening beat | Source |
|---|---|---|
| Dollar Shave Club | 0:00–0:09 warehouse walk, machete in hand, deadpan; "Hi, I'm Mike… for a dollar a month we send high quality razors right to your door. Yeah, a dollar." | [youtube.com/watch?v=ZUG9qYTJMsI](https://www.youtube.com/watch?v=ZUG9qYTJMsI), [mediashower.com](https://www.mediashower.com/blog/how-dollar-shave-club-beat-gillette-with-one-video) |
| Manscaped | Two miniature shaggy "boys" bobbing along the beach beside their full-size owner | [manscaped.com newsroom](https://www.manscaped.com/blogs/newsroom/manscaped%C2%AE-debuts-new-brand-campaign-paying-homage-to-one-of-the-world-s-greatest-love-stories-men-and-their-boys) |
| Solo Stove | Serious Snoop parting ways with smoke; camera pulls back to the fire pit; ends roasting a marshmallow | [musebyclios.com](https://musebyclios.com/music/snoop-goes-smokeless-for-his-solo-stove-fire-pit/) |
| Yeti | A grizzly bear attacks the cooler and fails to open it | [thecaseforbrand.beehiiv.com](https://thecaseforbrand.beehiiv.com/p/yeti-used-community-marketing-storytelling-make-coolers-status-symbol-build-338b-brand) |
| Ridge | Enemy swap: old way failing on frame one, product wins in the same shot, no voiceover | [paid.social/library/ridge](https://paid.social/library/ridge/), [aivideovault.com](https://aivideovault.com/ad-teardowns/ridge-wallet/) |
| True Classic | Broad audience + hyper-specific creative; a body gag lands before the fit claim | [marketingexamined.com](https://www.marketingexamined.com/blog/true-classics-funnel), [instagram.com/reel/DS5jtKTElzr](https://www.instagram.com/reel/DS5jtKTElzr) |
| Caraway | No food in frame — cookware photographed as sculpture | [honestecommerce.com](https://honestecommerce.com/blogs/episodes/turning-investor-no-s-into-new-networking-leads-jordan-nathan-caraway-home) |
| Great Jones | Packaging itself recognizable "on the stoop" before opening | [pentagram.com/work/great-jones](https://www.pentagram.com/work/great-jones) |

### 5.2 The six formats (and which one is ours)
1. **Founder manifesto to camera** (DSC). Price and deal inside 10 seconds. Our analogue: a founder
   stating the category's failure modes and the three-year warranty, no props needed.
2. **Enemy-swap demo** (Ridge). Old way fails, new way wins, one shot. Our analogue: the month-eight
   cheap steamer spitting on a shirt — mechanism, not slander (MARKETING.md §5).
3. **Distributed creator volume** (True Classic; category evidence below). Hundreds of modest clips
   beat one hero video.
4. **Story film with the product withheld** (Yeti, Solo Stove). Earns the right to the close-up later.
5. **Manufactured-question cascade** (Solo Stove). Cryptic posts → reveal → 13-day asset sequence.
6. **Visible before/after transformation** — **our native format**. Wrinkle removal is the same
   content class the data credits for teeth whitening and cleaning ("visible transformation in
   seconds") ([PRODUCT-DECISION.md](PRODUCT-DECISION.md) §3).

### 5.3 The volume thesis, with numbers (from the demand research)
- Comfrt Dreamer Blanket: "Its single best video made $1,115 — **0.16% of total product GMV**. It
  runs on 2,751 creators producing a high volume of modest-performing content." (z.media, week ending
  4 Oct 2026, via [PRODUCT-DECISION.md](PRODUCT-DECISION.md) §2)
- Mellow Sleep: **9,400 creators — the most on the chart — sold 1,979 units. $37 per creator.**
  Versus KakaPeople: 119 creators, $2,597 per creator.
- **The metric is revenue-per-creator (for us: revenue per content piece, target >$15 by day 90 per
  MARKETING.md §7), never creator count.**

### 5.4 Live signals — what is converting right now
- **TikTok Creative Center** (verified wiring via `tools/trendscan.mjs`, browser-rendered official
  data): the 9 Oct 2026 US scan (log `logs/trendscan.log`, artifact `data/trends/2026-10-09-us_gb_ca.json`)
  returned #shopwithconfidence rank 1 / 92,074 posts / rising / score 34, #october3rd rank 2 / 23,207
  / flat, #firstofthemonth rank 3 / 11,185 / decaying. Momentum is computed from the returned
  popularity curve, so every ranking is re-derivable from the artifact. **Known tool gaps**
  (`trendscan.mjs` KNOWN_GAPS): top-products and music surfaces are login-gated; Amazon Movers &
  Shakers renders nav only — the grid is not served.
- **Meta Ad Library**: read through third-party snapshots (the live library needs authenticated
  access — §8). Ridge's active portfolio: 290+ ads, **51% image / 40% dynamic / 9% video**; 500+
  launched in a January–February window, 78 kept live; the longest runner (live 140+ days) is a
  split-screen "Go lighter with Ridge Lite" ([foreplay.co](https://www.foreplay.co/post/the-ridges-ad-auction-analysis));
  live copy snapshots at [adrio.ai](https://adrio.ai/facebook-ads/the-ridge/176366735873065) and
  paired ad→page captures at [taylorsicard.com/brands/ridge](https://taylorsicard.com/brands/ridge).
  **The rule from the brief holds: creative that has run ~90+ days is the winner.**
- **Reddit / review complaints** — the actual hook source, mined in §6.

---

## 6 · PAIN LEDGER — every category complaint found, with source

Mined 10 October 2026 from Reddit (r/laundry, r/fixit, r/DIY, r/appliancerepair, r/ElectronicsRepair,
r/sewing, r/CleaningTips, r/malefashionadvice, r/drycleaning, r/BuyItForLife, r/AusFemaleFashion,
r/MyConsumerReviews), Amazon/Walmart review and Q&A pages, ProductReview.com.au, Wirecutter/Real
Simple/Good Housekeeping/Tom's Guide roundups, manufacturer support pages (Tefal, Philips, Russell
Hobbs), and CPSC recall notices. **Buckets: L = leak/spit · S = scale/minerals · H = dead
element/no steam · C = cord · W = warranty/service · O = other.**

**Each row is phrased so it can drop straight onto the PDP as a complaint→answer pair.** Frequency
signals are only stated where the source itself quantified them — Reddit vote counts could not be
retrieved (§8), so no vote figure is claimed anywhere.

### L — Leaks and spitting (the category's #1 defect, and the only one with regulator hard data)
| # | Complaint (as a PDP row states it) | Evidence (near-verbatim) | Source | Signal |
|---|---|---|---|---|
| L1 | Spits boiling water instead of steam — even brand new | "Brand new steamer shooting out boiling water"; reply: "lol that happened to me" | [r/laundry, 2022-11-11](https://www.reddit.com/r/laundry/comments/yrytki/brand_new_steamer_shooting_out_boiling_water_idk/) | Multiple "same here" replies |
| L2 | Starts spitting water after about a minute, worsens with age | "now when I try to use it it starts spitting water after about a minute of steam" | [r/fixit, 2020-10](https://www.reddit.com/r/fixit/comments/dprx97/handheld_garment_steamer_spitting_water/) | — |
| L3 | Ejects hard-water calcium that stains and ruins garments | "it spat out water and calc… Now there's light spots and the suit pants are essentially ruined" | [r/sewing, 2026-08-06](https://www.reddit.com/r/sewing/comments/1vguy0d/my_iron_just_spat_out_water_and_calc_and_ruined/) | "This happens to me all the time" (reply) |
| L4 | Pours water straight out of the soleplate | "it just straight up poured water out the sole plate" | [r/sewing, 2025-11-25](https://www.reddit.com/r/sewing/comments/1p6ri0p/help_my_iron_is_spitting/) | — |
| L5 | Spits droplets instead of vapor — the cheap-tier pattern | "the €30 spit a lot of droplets rather than just steam" | [r/malefashionadvice, 2026-07-31](https://www.reddit.com/r/malefashionadvice/comments/1vbrpyn/is_it_worth_spending_more_on_a_garment_steamer/) | — |
| L6 | Hose kinks once hot, then dumps condensation on the garment | "hoses that are prone to kinking after they heat up… massive drips because of condensation" | same URL | — |
| L7 | Must be held perfectly upright or it spits — awkward on sleeves | "you have to hold the steamer completely straight up and down, or you run the risk of dripping water, as it sputters a bit at different angles" | [realsimple.com](https://www.realsimple.com/home-organizing/cleaning/laundry/best-clothes-steamers) | Editor-tested |
| L8 | Splashes droplets in the first thirty seconds of every session | "occasionally splashes a few water droplets, especially in the first thirty seconds of steaming" | [howtotechinfo.com, 2026-08-09](https://howtotechinfo.com/oghom-steamer-for-clothes-review/) | "appears in many buyer reports" |
| L9 | Leaks from the top regardless of fill level — and scalds the user | "the trail still comes out from the top, soaking my clothes and splashing HOT WATER on me too! Very dangerous" | [revain.org, 2022-10-08](https://revain.org/reviews/uomeod-portable-steamer-capacity-handheld-b082vqmdjr) | — |
| L10 | The tank cap leaks, detaches, or melts under heat | "12 reports of issues with the water tank cap detaching, leaking, not staying closed, fitting loosely, or melting" | [CPSC, 2025-12-11](https://www.cpsc.gov/Recalls/2026/Sanven-Technology-Recalls-VEVOR-Steamers-Due-to-Risk-of-Serious-Injury-from-Burn-Hazard) | Recall data |
| L11 | Emits brown/discoloured water that stains fabric | "can cause spitting, brown staining or premature wear of the appliance" (manufacturer's own manual) | [tefal.com](https://www.tefal.com/instructions-for-use/csp/1830009167) | Manufacturer admission |
| L12 | Emits white flakes that land on the garment | "White flakes may be emitted during usage… Simply shake/brush the flakes off the garment" | [philips.com support](https://www.usa.philips.com/c-t/XC000006966/my-philips-garment-steamer-leaves-stains-on-the-garment) | Manufacturer admission |
| L13 | Puddles the floor from day one (standing units) | "from day one leaves puddles of water on the floor" | [productreview.com.au](https://www.productreview.com.au/listings/sunbeam-butler-turbo-sg3000) | Repeated across ~8 reviews on-page |
| L14 | Hot water pours out at the cord entry, onto hand and floor | "hot water poured out of the steamer where the electrical cord comes out… down my arm and on to the floor" | [productreview.com.au category](https://www.productreview.com.au/c/garment-steamers) | — |

### S — Scale, minerals, and what they kill
| # | Complaint | Evidence | Source | Signal |
|---|---|---|---|---|
| S1 | Tap water destroys the heating element | "tap water was too hard and messed up the heating element" | [r/laundry](https://www.reddit.com/r/laundry/comments/yrytki/brand_new_steamer_shooting_out_boiling_water_idk/) | — |
| S2 | Steam fades to nothing within weeks; vinegar only buys time | "'flushed' it using vinegar solution. The steam improved… Now there is no steam coming out at all" | [r/DIY, 2023-08-02](https://www.reddit.com/r/DIY/comments/15gclxc/no_steam_coming_out_of_garment_steamer/) | — |
| S3 | Scale physically blocks steam release | "there is a scale build up from all these precipitated ions and it's blocking the steam from releasing" | [r/appliancerepair, 2017-06-01](https://www.reddit.com/r/appliancerepair/comments/6ejral/hand_held_steamer_not_blowing_steam_still_turns/) | — |
| S4 | The water path jams solid on minerals even on careful owners | "the water just gets stuck… hard to get minerals… the hole that the water goes into is so tiny" | [r/fixit, 2024-06-25](https://www.reddit.com/r/fixit/comments/1dnso2z/advice_on_fixing_a_steamer/) | — |
| S5 | Scale is the dominant single cause of category death | "A steamer dies from mineral scale far more often than from mechanical failure" | [howtotechinfo.com, 2026-08-09](https://howtotechinfo.com/oghom-steamer-for-clothes-review/) | Reviewer synthesis over many reports |
| S6 | Scale alone drives a large share of leaks | "mineral buildup alone causes nearly 40% of all leaking problems, particularly in areas with hard water" | [propelrc.com](https://www.propelrc.com/steamer-leaking-water/) | Claims 3 years of testing |
| S7 | Chalky white residue collects around the nozzle vents | "Chalky, white buildup around the vents in the nozzle" | [realsimple.com, 2026-02-04](https://www.realsimple.com/home-organizing/cleaning/how-to-clean-steamer) | Editor-tested |
| S8 | Water left in the tank grows mold that must never touch fabric | "replace it is the ONLY safe solution here" | [r/CleaningTips, 2024-10-10](https://www.reddit.com/r/CleaningTips/comments/1alvlk2/the_tank_of_my_clothing_steamer_had_some_water/) | — |
| S9 | Corrosion opens the circuit at the base — unfixable | "One or more of those wires has corroded so much that it is an open circuit now" | [r/fixit, 2023-04-08](https://www.reddit.com/r/fixit/comments/12g114i/steamer_no_longer_steams/) | — |
| S10 | Even the descaling fix can void the warranty | "In general, you shouldn't clean steamers with vinegar. It's not good for them and will ruin them over time" | [r/appliancerepair, 2025-01-17](https://www.reddit.com/r/appliancerepair/comments/1i3qqnd/conair_handheld_steamer_wont_produce_steam_my_3rd/) | — |

### H — Dead element / no steam / weak steam (the death cluster)
| # | Complaint | Evidence | Source | Signal |
|---|---|---|---|---|
| H1 | Dies at three weeks | "Three weeks later it's stopped working. Display won't turn on… Steam function's gone" | [amazon.co.uk DRFLASH, 2026](https://www.amazon.co.uk/Dr-flash-Steamer-Clothes-Handheld-Rotatable/dp/B0G28LKP1W) | Category leader's own 1-star theme |
| H2 | Dead on the first real use | "Steamer Failed on First Proper Use… no hiss, no steam, nothing… the edges around the hot plate began to bubble" | [amazon.co.uk DRFLASH, 2026](https://www.amazon.co.uk/DRFLASH-Clothes-Straightener-Portable-Handheld/dp/B0DNJTMLWY) | Same listing |
| H3 | False low-water fault on a full tank | "Even though water tank is to max, It keeps coming up with the lack of water message" | same URL | Same listing |
| H4 | Dies on the third use / before ten uses | "it stopped putting out steam on the 3rd use"; "I use it less than 10 times" | [Amazon Q&A](https://www.amazon.com/ask/questions/TxQGN9YMPKJGH), [productreview.com.au](https://www.productreview.com.au/listings/home-co-hand-held-garment-steamer) | ~9 answers report the same fault |
| H5 | Never gets hot — the light blinks forever | "even after 5 minutes, the steamer doesn't really feel hot at all" | [r/fixit, 2025-10-10](https://www.reddit.com/r/fixit/comments/1o2yzpy/handheld_steamer_turns_on_but_never_heats_up_or/) | — |
| H6 | Boiler stops heating while the pump runs — thermal fuse | "The unit has power, water pump works, but the boiler does not heat" | [r/DIY, 2021-10-10](https://www.reddit.com/r/DIY/comments/pt89a7/clothing_steamer_not_heating_suspect_thermal_fuse/) | — |
| H7 | Third identical unit in a row dies the same death | "for the 3rd time, it turns on, it heats up, but it won't produce steam" | [r/appliancerepair, 2025-01-17](https://www.reddit.com/r/appliancerepair/comments/1i3qqnd/conair_handheld_steamer_wont_produce_steam_my_3rd/) | — |
| H8 | Control board fails on an annual cycle, even pro-grade | "almost every year the main PCB becomes faulty that I have to replace entirely" | [r/ElectronicsRepair, 2026-02-28](https://www.reddit.com/r/ElectronicsRepair/comments/1rhgtuu/identifying_garment_steamer_pcb_faulty_component/) | — |
| H9 | The element connector is the factory weak point | "power was flowing into the heating element but not out of it… the connector had broken" | [r/diyelectronics, 2020-05-30](https://www.reddit.com/r/diyelectronics/comments/gtf8q0/homeright_steammachine_repair_question/) | — |
| H10 | Dies inside 1–2 years — rated "Very High" for the segment | "Complete failure within 1-2 years — Very High… Far exceeds reasonable lifespan for the price segment" | [devicepitfalls.com, 2026-02-04](https://www.devicepitfalls.com/garment-steamer-smells-like-chemicals/) | Analysis piece's own frequency table |
| H11 | Cheap handhelds die inside a year — the category verdict | "skip the $25–$40 bin entirely. You'll replace it within a year" | [homeproductinsider.com, 2026](https://homeproductinsider.com/) | Reviewer synthesis across 6 steamers |
| H12 | ~7% one-star rate on the best-selling budget handheld is dominated by units that quit | "The 7% one-star rate includes units that stopped steaming after months" | [tidyhacks.co, 2026](https://tidyhacks.co/reviews/hilife-portable-handheld-clothes-steamer/) | 129,000 reviews, 4.3★ |
| H13 | Slow ~2-minute heat-up arrives exactly when you're late | "it takes soo long to heat up and at that point it's better to just iron" | [r/BuyItForLife, 2025](https://www.reddit.com/r/BuyItForLife/comments/1lc5nuy/garment_steamer_for_home_use/) | — |
| H14 | Dies the moment the warranty ends | "This unit only lasted as long as the warranty (2 years)… It appears it's a known issue" | [productreview.com.au](https://www.productreview.com.au/c/garment-steamers) | Repeated in ≥3 reviews on-page |

### C — Cord
| # | Complaint | Evidence | Source |
|---|---|---|---|
| C1 | Cord shorter than a curling iron | "the cord is maybe 3-4 feet long… Who makes a steamer with a cord shorter than a curling iron?" | [Walmart review](https://business.walmart.com/reviews/product/15095359289) |
| C2 | Advertised cord length materially overstated | "it only had maybe a 4ft cord and was advertised as having over a 9 ft cord" | same URL |
| C3 | No cord wrap — tangles in luggage | "a loose nine foot cable in a suitcase becomes a tangled mess" | [howtotechinfo.com](https://howtotechinfo.com/oghom-steamer-for-clothes-review/) |
| C4 | Steam heat degrades cord insulation over time | "The heat can degrade the insulation over time if you're constantly blasting it" | [buildstatus.puri.sm](https://buildstatus.puri.sm/conair-extremesteam-handheld-garment-steamer) |

### W — Warranty, service, and the treadmill
| # | Complaint | Evidence | Source | Signal |
|---|---|---|---|---|
| W1 | Warranty expires just before failure; a discount code offered instead of a remedy | "the steamer is no longer covered by the warranty because the warranty expired 4.5 months ago. They instead offered me a 25% discount code" | [productreview.com.au, Philips](https://www.productreview.com.au/listings/philips-comforttouch-gc557-30) | ~1,900-word review |
| W2 | Premium price vs sub-year lifespan | "$300 to last a year isn't a good deal" | same URL | — |
| W3 | Dies at 8 months; the warranty replacement dies too | "the original stop working… after 8 months. Got it replaced under warranty to then have the new one do the same" | [productreview.com.au, Sunbeam](https://www.productreview.com.au/listings/sunbeam-butler-turbo-sg3000) | — |
| W4 | Repeat failures with no brand response | "With the number of complaints, you'd think Conair would fix the problem" | [Amazon Q&A](https://www.amazon.com/ask/questions/TxQGN9YMPKJGH) | — |
| W5 | The buyer pays return shipping on a faulty unit | "if its faulty. YOU have to pay the return cost. Not them!!" | [amazon.co.uk DRFLASH](https://www.amazon.co.uk/DRFLASH-Clothes-Straightener-Portable-Handheld/dp/B0DNJTMLWY) | — |
| W6 | The retailer shows NOREFUNDS on a failed unit | "NOREFUNDS" | [Walmart review](https://business.walmart.com/reviews/product/670418489) | — |
| W7 | Repeat purchase is the expected experience, stated by owners | "it will ONLY work at the beginning, after that… you will buy another one, so it's better to get a good one right away" | [revain.org, 2022-10-08](https://revain.org/reviews/uomeod-portable-steamer-capacity-handheld-b082vqmdjr) | — |

### O — Other recurring deficiencies
| # | Complaint | Evidence | Source |
|---|---|---|---|
| O1 | Handle too hot to hold without gloves and a towel | "Handle gets too hot. Had to wear gloves + wrapped towel around to use it" | [productreview.com.au](https://www.productreview.com.au/listings/kambrook-kss150) |
| O2 | Palm burn from hot water at the handle junction | "I have quite a nasty burn to the palm of my hand from water coming through the connection of the handle" | same URL |
| O3 | Persistent chemical/plastic odour carried into fabrics by the steam | "it is continuous contamination from thermally unstable materials" | [devicepitfalls.com](https://www.devicepitfalls.com/garment-steamer-smells-like-chemicals/) |
| O4 | Unit smokes; burning smell develops | "a bad smell started developing and I unplugged the steamer… it was SMOKING" | [r/Ulta, 2026-08-05](https://www.reddit.com/r/Ulta/comments/1vg6u6w/pattern_hair_steamer_defectsissues/) |
| O5 | Tank so small it yields ~2 minutes of steam | "80ml of water = 2min of steaming… Useless!!!" | [productreview.com.au](https://www.productreview.com.au/listings/home-co-hand-held-garment-steamer) |
| O6 | Runs dry mid-garment; refilled twice for one shirt | "I had to refill it twice for one shirt which was badly wrinkled" | same URL |
| O7 | Body gets hot with prolonged use; can't be set down | "长时间连续使用机身发烫明显" ("the body gets noticeably hot with prolonged continuous use") | [cifnews.com, 2026-06-11](https://www.cifnews.com/article/186742) |
| O8 | Weak on denim and heavy wool; deep creases survive | "Weak on denim and heavy wool, where set creases survive repeated passes" | [howtotechinfo.com](https://howtotechinfo.com/oghom-steamer-for-clothes-review/) |
| O9 | Garments come out damp; can't be worn immediately | "I found garments to be slightly damp afterwards… had to wait for the item to fully dry" | [tomsguide.com, 2025-01-18](https://www.tomsguide.com/home/i-hate-ironing-so-i-tried-a-usd35-steamer-gadget-instead-heres-exactly-what-happened) |
| O10 | Water goes sour in the tank between uses | "You either end up having to empty your water each time… or the water goes sour too quickly" | [r/malefashionadvice](https://www.reddit.com/r/malefashionadvice/comments/1vbrpyn/is_it_worth_spending_more_on_a_garment_steamer/) |
| O11 | Two-handed operation — someone must hold the garment | "You're still holding the garment with both hands the entire time — it's a press, not a hands-free device" | [homeproductinsider.com](https://homeproductinsider.com/) |
| O12 | Advertised runtime materially overstated | "advertises 'up to 10 minutes' of steam — a far cry from the four minutes that I eked out of a full tank" | [Wirecutter, 2024-07-17](https://www.nytimes.com/wirecutter/reviews/nori-press-review/) |
| O13 | 110–120V only — a travel product that can't travel | "110-120V only… a significant limitation for a product marketed on travel" | [softpickr.com](https://softpickr.com/product/drflash-2-in-1-garment-steamer-iron-review/) |
| O14 | Runs dry and is killed by it | "the listing warns about this specifically, and it is the most common way these units are killed" | same URL |

### 6.1 The regulator's hard data — the strongest numbers in the category
These are the only audited frequency figures found anywhere in the research, and they all point at the
same defect: **hot water expelled during use.**

| Recall / action | Units | Incident reports | Burn injuries | Source |
|---|---|---|---|---|
| BLACK+DECKER HGS011 (Empower Brands, expanded) | ~2,000,000 | 317 reports of hot water expelling | 82, incl. 7 second-degree | [CPSC, 2024-04-04](https://www.cpsc.gov/Recalls/2024/Two-Million-Black-Decker-Garment-Steamers-Recalled-by-Empower-Brands-in-Major-Recall-Expansion-Due-to-Burn-Hazard-Refund-Now-Offered) |
| Vornado / Steamfast / Sharper Image handhelds | ~2,000,000 | 122 reports of hot water spraying | 23 | [CPSC, 2024-02-08](https://www.cpsc.gov/Recalls/2024/Vornado-Recalls-Two-Million-Handheld-Garment-Steamers-Due-to-Serious-Burn-Hazard) |
| HSN ("As Seen On TV") steamers | 5,400,000 | "hundreds of complaints of leaks and spewing water" | 100+; HSN paid a $16M civil penalty | [CBS News, 2024-04-04](https://www.cbsnews.com/news/black-and-decker-garment-steamers-recall-dozens-burned/) |
| VEVOR FCL-H09 / ES-H10 (Sanven) | ~2,840 | 6 spitting/pouring + 12 tank-cap failures | 2 | [CPSC, 2025-12-11](https://www.cpsc.gov/Recalls/2026/Sanven-Technology-Recalls-VEVOR-Steamers-Due-to-Risk-of-Serious-Injury-from-Burn-Hazard) |

**At least ~9.4 million handheld garment steamers recalled in the US since 2021 on the
hot-water-expulsion defect alone, with 205+ reported burn injuries.** That is the single most
quantifiable, regulator-confirmed deficiency in the category — and exactly the deficiency a new
entrant can credibly claim to have engineered out. (Note for the PDP: this is a claim about the
category's record, cited to the CPSC; our own leak/spit performance is a product claim we may only
make once we can substantiate it — see §7's disclosure rules and the EMAIL-LAW-style discipline of
never claiming what isn't proven.)

### 6.2 The category leader's negative pattern (the commercial opening)
Dr.Flash's 37,989 reviews @ 4.6★ (PRODUCT-DECISION.md; the count itself is **unverified** — the
TikTok PDP is client-rendered and could not be independently confirmed; verifiable aggregates: Amazon
US 4.1/2,555, Walmart 4.4/56 with 11% one-star — §8). Its 1-star pattern is not "it doesn't work":
1. **it dies in weeks** (H1, H2); 2. **the tank is too small** (O5, O6 — the most-cited negative in
Chinese trade press aggregating its 1-star reviews, [cifnews.com](https://www.cifnews.com/article/186742));
3. **it leaves fabric damp / emits droplets** ([infoquu.com, 2026-03-29](https://www.infoquu.com/i-tried-dr-flash-steamer-is-it-worth-it-heres-my-honest-review/));
4. **the body gets hot** (O7); 5. **returns are on the buyer** (W5); 6. **it feels seasonal** —
"it also doesn't feel like something built for heavy, long-term use" (same URL).
Its own listing has to defend the category's #1 complaint — "Does the steamer spit water or leak
during use? **No.**" ([amazon.co.uk](https://www.amazon.co.uk/Dr-flash-Steamer-Clothes-Handheld-Rotatable/dp/B0G28LKP1W))
— which means the attack surface is already named on the page that dominates the category.

---

## 7 · OUR WEDGE — the one thing this brand does that the category does not

Sourced from `MARKETING.md` (MONO strategy, 8 Oct 2026) and `PRODUCT-DECISION.md` (demand + unit
economics, 8 Oct 2026), against the live catalogue row (`the-steamer`, SKU CJYD320992601AZ:
COGS $14.41, freight $11.65, landed $26.06, price $89, suggested retail $119.90, weight 0.85 kg,
system: true).

### 7.1 The diagnosis the research produced
**The category sells a spec, and the winners never answer the complaints.** The category leader moves
44,800 units a month at $29.70 off a spec sheet (2000W, 300ml, heat-up seconds), and its entire
negative-review tail is the ledger in §6: dies in weeks, tank too small, damp fabric, hot body,
returns on the buyer. The playbooks in §1 show the same move at the other end of the market — Ridge
and Yeti win by publishing a promise and a limit, not a spec — but **no one in this category sells
the promise.** The spec is furniture-quality; the failure modes are the product experience. That gap
is the wedge.

### 7.2 The offer: a system, not a spec
**The MONO Steamer at $89 — the unit, the case, the protocol, and three years of someone to
call.** The appliance is deliberately near-identical to the $29.70 one; that is the point. Per
MARKETING.md §1: "we are not pretending the hardware is special. We are selling what happens after
you unbox it." Every element answers named rows of the §6 ledger:

| Ledger rows | The complaint in the buyer's words | Our answer (the system element) | Where it lands on the PDP |
|---|---|---|---|
| H1, H2, H4, H7, H10, H11, H12, H14 | "It died in three weeks" | **3-year warranty** — the single row that answers the death cluster; the mechanism copied from Ridge's wedge (§1.2) and Bombas's no-condition happiness guarantee (§3.2) | Hero band + buy box, always visible, like Ridge's nav bar |
| W1, W3, W5, W6, W7 | "The warranty ended just before it broke; I paid to return it" | Warranty terms published in plain text: what is covered, what it costs, how the claim works — the Manscaped disclosure pattern (§1.4) | `/how` page + warranty module on PDP |
| S1–S7, S10 | "Scale killed it; I wasn't allowed to descale it" | **The protocol** — the descaling/water routine ships in the box as the operating manual (the Great Jones care-card mechanism, §1.10); the case stores the unit dry (S8, O10: mold/sour water are storage failures, not unit failures) | Protocol module on PDP + physical card in the case |
| L1–L9, L13, L14 | "It spat boiling water on my shirt" | Answered by the **limit-of-claim discipline**: we state the failure mode exists in the category (CPSC data, §6.1) and warrant the outcome — we do not claim the hardware is leak-proof until it is proven (§3.3 pattern) | Failure-mode section, mechanism-not-slander |
| O5, O6, O12 | "Two minutes of steam, then a refill" | Honest runtime figure + refill step in the protocol — the number is stated once and it is the real one (Wirecutter caught the category overstating runtime, §6 O12) | Spec ledger + hero BigNumber |
| C1–C4 | "The cord is shorter than a curling iron" | Cord spec printed, case stores the cord without kinking (C3 is a storage complaint) | Spec ledger |
| O1, O2, O4 | "The handle burned my hand" | Handle temperature + burn guidance in the protocol; the category's own recall data cited | Failure-mode section |
| O13 | "It can't travel — 120V only" | Voltage band printed on the spec ledger (PRODUCT-DECISION.md's supply spec lists the 100–240V family for this SKU tier — print only the figure the signed supplier quote proves) | Spec ledger |
| O11 | "Someone has to hold the shirt" | The case becomes the hang station — the two-handed complaint answered by the accessory, not a claim | PDP sequence + case module |

### 7.3 The ICP, in one sentence
From MARKETING.md §2, and it is the entire media plan: **"Which one didn't break."** The burnt-out
steamer owner, 28–48, has already bought one; it dripped, scaled, or stopped heating in eight
months. They are not shopping for a gadget; they are shopping for the thing that does not make them
buy it again. (Explicitly not the ICP: first-time price shoppers, garment presser buyers, anyone
outside NA/UK/EU — certification cost kills those markets at this margin.)

### 7.4 The funnel this research prescribes (Shape 2, with Shape 1's opening)
- **Ad** — enemy-swap / failure-mode creative (§5.2 formats 1–2 + 6). The hook is the month-eight
  cheap steamer; the payoff is the warranty. Per Ridge: 500+ angles launched, only the runners kept.
- **Landing** — `/` and `/how` educate first (Ridge's two-page lift, §1.2); `/steamer` is the only
  page with a form; one conversion goal per page (MARKETING.md §4).
- **PDP** — the ledger armature: every §6 row that applies becomes a complaint→answer row, the
  3-year warranty pinned like Ridge's nav bar, the spec ledger honest (runtime, voltage, weight),
  the render labelled a render.
- **Post-purchase** — the protocol card in the case (registration by QR, Solo Stove's mechanism,
  §1.7) and warranty claims handled without the buyer paying freight (the W5 pattern, inverted).
- **Channel ranking** (MARKETING.md §5): Tier 1 is search intent on the failure modes — a page that
  answers "why does my garment steamer leak" sells the replacement. Tier 2 is short-form volume,
  measured as **revenue per content piece >$15**, never creator count (§5.3). Tier 3 is refused:
  Amazon (we would be the 37,989th review), influencer unboxing, paid prospecting at $89 against
  $29.70.

### 7.5 The money, stated before we spend it
From PRODUCT-DECISION.md §3 (8 Oct 2026 quotes) and the live catalogue row: at $89, contribution
before acquisition is **$55.40 (62%)**, after an $18 CAC **$37.40 (42%)** — against the same product
on TikTok Shop at $29.70 paying ~$7.55 COGS, ~15% platform commission and a creator commission
"inside $20, on a price we do not control." The discipline that makes it work: **no discount
mechanic, ever**; the first hundred customers set the reference price permanently; 250 units ordered
and a weekly re-order decision, no exceptions; kill criteria fixed in advance (if day 90 shows <60
units at ≥8% returns, the product is wrong, not the marketing).

### 7.6 What we take from each playbook — one line each
| Brand | What MONO takes |
|---|---|
| Dollar Shave Club | Price + deal inside the first 10 seconds; referral as product, not cash |
| Ridge | **The warranty-wedge funnel: education page first, guarantee pinned, runners kept** |
| True Classic | Volume of angles; post-purchase survey → content narrative loop; objections printed as Problem→Solution |
| Manscaped | Subscription/anything-recurring disclosed inline at the buy box; the limit printed beside the claim |
| Casper | Budget the guarantee as a line item ($81M/year is what 100 nights costs at scale) |
| Yeti | Named specs + the published refusal to claim; status through a tribe |
| Solo Stove | Named mechanism with its physics; registration in the box via QR; the manufactured-question cascade |
| Caraway | Waitlist built during R&D; access-rewards referral instead of discount referral; the unboxing that explains itself |
| Our Place | Scarcity stated out loud only when true |
| Great Jones | **The care card that unfolds into the protocol — the manual as unboxing media** |
| Bombas | Operations published or the promise is a slogan (we make no mission claim we cannot document) |
| Wildgrain | Persuasion *between* the buyer's own diagnosis steps |

---

## 8 · UNVERIFIED — everything looked at and could not confirm

Per the brief: these are gaps, not facts. Nothing in §1–§7 depends on any item below.

### 8.1 People and channels the brief named
- **James Beeson** — no brand-teardown channel exists under this name. The verified person is James
  Beeson, Drinks Editor at The Grocer (UK grocery trade) — [thegrocer.co.uk/james-beeson/3931.bio](https://www.thegrocer.co.uk/james-beeson/3931.bio).
- **Chris Winter** — the verified person is an Australian TV presenter ([en.wikipedia.org](https://en.wikipedia.org/wiki/Chris_Winter_(Television_Presenter)));
  a separate dormant channel "Chris Winter Tutorials" (~88–90K subs, investing content, ~5 years
  inactive) is the only ecom-adjacent match. Neither is the UGC channel named in the brief.
- **"Sebastian Esala"** — no such entity found. Closest verified figure: Sebastian Esqueda
  (~181–183K subs, dropshipping/motivational) — [youtube.com/sebastianesqueda](https://www.youtube.com/sebastianesqueda) — not a teardown creator.
- **Nick Nayani** — nothing found in any ecom, marketing or teardown context.
- **Wholesale Ted** (Sarah Chrisp, ~1.42–1.48M), **Ac Hampton** (Supreme Ecom, ~623–674K), **Dave
  Nick** (~800K+), **Charlie Morgan** (~306–315K) — all verified real, all ecom/online-business
  education, none does premium-brand or funnel teardowns. **Ecom Wolf** (Lara Rahib, ~8.3–9.5K) —
  dropshipping education. **Ben Heath** (Heath Media, ~433–457K) — the only adjacent one; does
  brand-level *ads* strategy analysis ([youtube.com/watch?v=XtoJVbu4Bys](https://www.youtube.com/watch?v=XtoJVbu4Bys)).
- **"premium brand teardown" as a YouTube genre** — the phrase has no meaningful footprint. The
  closest dataset (Thunderbit's DTC YouTube Atlas, 5,695 videos / 277 channels) shows the
  funnel-mechanics content type (`metrics_finance`) has a **median of 52 views per video**
  ([thunderbit.com/blog/dtc-youtube-atlas](https://thunderbit.com/blog/dtc-youtube-atlas)) — which is
  why no channel owns the space. The teardown work that exists is written and agency-run (§1 cites:
  ConvertFlow's Funnels Show, DTC Daily, Nik Sharma, Curtis Howland's 11,999-ad dataset, Arclen).

### 8.2 First-three-seconds frames that could not be sourced
No timestamped, frame-level teardown exists for **Ridge video ads** (91% of its active ads are
image/dynamic), **True Classic** (its opening is a creative *system*, not a frame), **Casper** (the
funnel leads with a quiz CTA), **Yeti/Caraway ad transcripts** (Meta Ad Library and TikTok Creative
Center's ad surfaces require authenticated access — not available this session; §5.4 cites
third-party ad-library snapshots instead: [foreplay.co](https://www.foreplay.co/post/the-ridges-ad-auction-analysis),
[adrio.ai](https://adrio.ai/facebook-ads/the-ridge/176366735873065), [taylorsicard.com](https://taylorsicard.com/brands/ridge)).

### 8.3 Archive and rate limits
- **archive.org returns 429 above ~2 domains per window.** This sweep queried exactly **three**
  domains across two spaced passes: ridge.com + casper.com (analysis pass), dollarshaveclub.com
  (this pass, `sleep 3` between every call). **yeti.com was not queried** — its retail pivot is the
  obvious next run. The DSC 2020 snapshot served a JS shell; the 2013 snapshot is the usable capture.
- **Casper's Apr 2026 crawl shows two live promos simultaneously** (a "Birthday Sale… expires 4/21/26"
  homepage against a "Spring Savings… expires 3/31/26" collection page) — both URLs are in §1.5
  rather than one being picked.
- **Ridge's own pages contradict each other**: US "Built for Life" covers loss/theft for a fee, while
  the older regional text says "This warranty does not cover lost, stolen, or disposed of wallets,"
  and replacement fees differ by region ($17.95/$27.95 US · $25/$39 CA · $30/$47 AU) — all four URLs
  in §1.2. Its "Never Lost, Forever Fit" page returned 403 on every regional variant.
- **Casper's adjustment period contradicts across its own sites**: 30 nights (US,
  [casper.com/pages/trial](https://casper.com/pages/trial)) vs "up to two weeks" (CA,
  [casper.ca/en/trial](https://casper.ca/en/trial)).

### 8.4 Tool and data limits during this sweep
- **Tavily quota was exhausted** (HTTP 432, plan usage limit) across the research sessions; one
  search backend rate-limited (429) after the first eight queries. All web claims were retrieved
  via `websearch`/`webfetch` and direct page reads, not from Tavily.
- **Reddit blocks fetching from this environment** — every Reddit complaint in §6 is cited by thread
  and text, but **no upvote or reply count is claimed anywhere**.
- **Dr.Flash's 37,989 reviews @ 4.6★ could not be independently verified** — the TikTok Shop PDP is
  client-rendered. Verifiable aggregates for the same brand: Amazon US 4.1/2,555; Walmart 4.4/56 with
  11% one-star; TrendVy 4.6. The demand figure stands on PRODUCT-DECISION.md's third-party estimate.
- **Amazon Movers & Shakers was not readable** — the grid is not served to automation
  (`trendscan.mjs` KNOWN_GAPS). The triangulation method (M&S + hashtag growth + Google Trends)
  remains per [PRODUCT-DECISION.md](PRODUCT-DECISION.md) §2 / Ainfluencer.
- **BuiltWith's Manscaped profile could not be retrieved** (image-CAPTCHA gate across multiple
  sessions). No Manscaped stack claim is made anywhere in this file. Ridge's BuiltWith profile shows
  an empty ecommerce section even though archived storefront HTML carries Shopify markers — flagged,
  not resolved.

### 8.5 Individual claims left open
- **Great Jones' current price ladder** — greatjones.net timed out; the $145→$160 Dutchess figures
  are the most recent documented numbers (2018–2023).
- **Bombas' subscription** — contradictory third-party claims, no Bombas-owned subscription page
  found; treat the ladder as single → 4-pack → 6/12-pack. Its referral figures ($20/25%) come from a
  coupon aggregator and are lower-confidence.
- **Yeti's unboxing/packaging system** — undocumented; the free hat + t-shirt growth-loop claim rests
  on a single opinion source and is treated as indicative only.
- **DSC's live refer-a-friend page** redirects to the homepage; the launch-era referral copy cited in
  §1.1 is from the January 2013 archive snapshot.
- **How It Scaled** (channel verified to exist, subscriber count unverified); ConvertFlow's Funnels
  Show #4 (Branch Furniture) and the Sweat Equity "$1.2B funnel" video exist but their watch URLs
  were not captured, so they are not cited.
- **Wildgrain** — the full 5-question quiz beyond Q1 and the box pricing behind signup were not
  captured; only the live hub page is cited (§1.12).

### 8.6 Next moves after this file
1. Re-run the archive pass for **yeti.com** (≤2 domains, `sleep 3`) — its retail pivot over time is
   the missing archaeological data point.
2. Capture Meta Ad Library creative manually (browser, logged in) for the three failure-mode formats
   in §5.2 before committing to format #6's production volume.
3. Build `data/marketing/the-steamer.json` from this file via `tools/market/run.mjs` (research /
   psychology / data teams) — the pain-points module renders **sourced rows only**, and every row of
   §6 carries its source.
