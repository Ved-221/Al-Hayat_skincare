# Public Asset Audit

## Overview
This audit verifies all files currently stored in `/public` to identify duplicates via MD5 hash comparison and track their references in the codebase.

### Unique Assets
| Filename | Type | Size (Bytes) | Hash (MD5) |
|---|---|---|---|
| `bgremoved_photos/amla.png` | Image | 325,600 | `23BA94DE8DF8F1EFD407144CBF7F23EB` |
| `bgremoved_photos/beetroot.png` | Image | 2,046,676 | `2495BA6CEF2AD4A1A7AD9206ED0237E8` |
| `bgremoved_photos/coconut.png` | Image | 2,635,445 | `FF4D3BE2A512DD9D677B28B36CF1EDD7` |
| `bgremoved_photos/hibiscus.png` | Image | 2,577,318 | `E1B4F48E66DE93F424CB2D9F9D6864C8` |
| `bgremoved_photos/lemon.png` | Image | 1,443,632 | `D89679261E0FE21D5D5514F4BA9788D5` |
| `bgremoved_photos/mint.png` | Image | 2,064,519 | `3B1AE16F20B6DE4D5E03EE74BA0B6BA7` |
| `bgremoved_photos/neem.png` | Image | 4,294,721 | `B84C81CC58F00EFB33A4FFBA1F55C089` |
| `bgremoved_photos/rice.png` | Image | 3,833,111 | `1CB80324705BA4A2E70AF93A7FDD7CD3` |
| `bgremoved_photos/rose.png` | Image | 2,622,604 | `F9D2FF035C8DD189158309E0AFEE9216` |
| `bgremoved_photos/strawberry.png` | Image | 2,938,547 | `56F749962291CECA3BDDAB742CFE2D40` |
| `bgremoved_photos/watermelon.png` | Image | 818,878 | `3E3EA80C37DF0BC5F774D25FD675F028` |
| `hero_video.mp4` | Video | 10,222,551 | `C8F9E8284DE16C6A97AE0DEBE10ACFA3` |
| `keep_everything_in_this_video_gwr_video_mvp.mp4` | Video | 2,438,846 | `382E49AE3AC8C31D821EDDA37AC65C7B` |
| `make_the_aspect_ration_of_this_gwr_video_mvp.mp4` | Video | 12,341,961 | `B7770DEB403195CEF54F318D685C1C24` |
| `logo_withoutbg.png` | Image | 525,435 | `6B12C209BC6010F23CD360B9BB93CC5B` |

### Duplicated Assets (Hash matches)
The following sets of files are exact bit-for-bit duplicates across different directories.

**Set 1: Baby Soap** (`7C29E96B501F5EA466CC562E5FEEBEF8`)
- `photos/new_product_img/baby-soap-background-removed.png`
- `photos/product-images/baby-soap.png`
- `products/baby-soap.png`

**Set 2: Beetroot Lipbalm** (`82D112A74D45A530DD0DA35063F83F99`)
- `photos/new_product_img/beetroot-lipbalm-background-removed.png`
- `photos/product-images/beetroot-lipbalm.png`
- `products/beetroot-lipbalm.png`

**Set 3: Facewash** (`AF0C5DA05C1C76E91C451CFA9D80C7C3`)
- `photos/new_product_img/facewash-background-removed.png`
- `photos/product-images/facewash.png`
- `products/facewash.png`

**Set 4: Facewash 2** (`AE83690650126A005C510572E14DB596`)
- `photos/new_product_img/facewash2-background-removed.png`
- `photos/product-images/facewash2.png`
- `products/facewash2.png`

**Set 5: Hair Oil** (`09D9218FC6A09531EECDDA5818EAFABC`)
- `photos/new_product_img/hair-oil-background-removed.png`
- `photos/product-images/hair-oil.png`
- `products/hair-oil.png`

**Set 6: Herbal Hair Oil** (`5FC0193B0996270585BE580B1B9E508D`)
- `photos/new_product_img/herbal-hair-oil-background-removed.png`
- `photos/product-images/herbal-hair-oil.png`
- `products/herbal-hair-oil.png`

**Set 7: Hibiscus Beetroot Facewash** (`0076302AA2005950C3504F515807B3EB`)
- `photos/new_product_img/hibuscuss_beetroot-facewash-background-removed.png`
- `photos/product-images/hibuscuss_beetroot-facewash.png`
- `products/hibuscuss_beetroot-facewash.png`

**Set 8: Rice Lemon Soap** (`75EBC5489FDD3E7BDBD99F9AB7EAD43D`)
- `photos/new_product_img/ricelemon-soap-background-removed.png`
- `photos/product-images/ricelemon-soap.png`
- `products/ricelemon-soap.png`

**Set 9: Shampoo** (`83C7EF8FAA32A8C2B9634B905501A891`)
- `photos/new_product_img/shampoo-background-removed.png`
- `photos/product-images/shampoo.png`
- `products/shampoo.png`

**Set 10: Soap** (`88A8BE31DA75DF375FF583FA231C6650`)
- `photos/new_product_img/soap-background-removed.png`
- `photos/product-images/soap.png`
- `products/soap.png`

**Set 11: Strawberry Lipbalm** (`3593B010FEBE8D2CF0062BC0359822A7`)
- `photos/new_product_img/strawberry_lipbalm-background-removed.png`
- `photos/product-images/strawberry_lipbalm.png`
- `products/strawberry_lipbalm.png`

**Set 12: Watermelon Soap** (`A2ED14AE2A3979A424F042178BBD171D`)
- `photos/new_product_img/watermelon-soap-background-removed.png`
- `photos/product-images/watermelon-soap.png`
- `products/watermelon-soap.png`

**Set 13: Brand Logo** (`F6A7EE4FC86566D340D87EEBB35AB502`)
- `photos/whatsapp-image-2026-06-05-at-2-1785588667730.jpeg`
- `photos/brand_logo/logo.jpeg`

### Unreferenced Files Flagged for Manual Review
- `make_the_aspect_ration_of_this_gwr_video_mvp.mp4` (Leftover AI output)
- `photos/whatsapp-image-2026-06-05-at-2-1785588667730.jpeg`
- All files in `photos/new_product_img/` and `photos/product-images/` are exact duplicates of `products/` and are not directly referenced.
