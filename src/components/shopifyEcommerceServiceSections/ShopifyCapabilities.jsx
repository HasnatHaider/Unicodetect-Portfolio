import {
  CreditCard,
  Database,
  Palette,
  PanelsTopLeft,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { IMAGES } from "../../utils/Constant";
const ShopifyCapabilities = () => {
  return (
    <div
      className="layout-item shopify-capabilities layout-full is-loaded layout-flex layout section-root"
      id="shopify-capabilities"
    >
      <div className="layout-item shopify-capabilities__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            decoding="async"
            width="328"
            height="600"
            src={IMAGES.unicode_shopify_2371_1422}
            alt=""
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="layout-item shopify-capabilities__image-2 width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="215"
            height="600"
            src={IMAGES.unicode_shopify_2371_1423}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item shopify-capabilities__image-3 width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="1421"
            height="690"
            src={IMAGES.unicode_shopify_2371_1424}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item shopify-capabilities__layout is-loaded layout-flex layout-boxed layout">
        <div className="layout-inner is-loaded">
          <div className="layout-item shopify-capabilities__layout-2 layout-full is-loaded layout-flex layout">
            <div className="layout-item shopify-capabilities__our-services-capabilities width-auto content-block block-heading">
              <div className="content-inner">
                <p className="heading">OUR SERVICES &amp; CAPABILITIES</p>
              </div>
            </div>
            <div className="layout-item shopify-capabilities__tailored-commerce-technologies content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">Tailored Commerce Technologies</h2>
              </div>
            </div>
            <div className="layout-item shopify-capabilities__deep-integrations-highly-optimized width-custom content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Deep integrations, highly optimized user flows, and reliable
                  payment systems designed for domestic and international
                  retail.
                </p>
              </div>
            </div>
          </div>
          <div className="layout-item shopify-capabilities__layout-3 layout-full is-loaded layout-flex layout">
            <div className="layout-item shopify-capabilities__layout-4 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-capabilities__layout-5 layout-full is-loaded layout-flex layout">
                <div className="layout-item shopify-capabilities__image-4 width-custom content-block block-image">
                  <div className="content-inner">
                    <Palette
                      size={18}
                      aria-hidden="true"
                      className="service-image-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__custom-shopify-themes content-block block-heading">
                <div className="content-inner">
                  <h3 className="heading">Custom Shopify Themes</h3>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__lightweight-liquid-templates-built-e content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Lightweight Liquid templates built entirely from scratch,
                    built for sub-second page loads with zero unnecessary block bloat.
                  </p>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-capabilities__layout-6 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-capabilities__layout-7 layout-full is-loaded layout-flex layout">
                <div className="layout-item shopify-capabilities__image-5 width-custom content-block block-image">
                  <div className="content-inner">
                    <ShoppingCart
                      size={18}
                      aria-hidden="true"
                      className="service-image-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__app-integrations-customization content-block block-heading">
                <div className="content-inner">
                  <h3 className="heading">
                    App Integrations &amp; Customization
                  </h3>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__rigorous-configuration-of-advanced-s content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Rigorous configuration of advanced search engines, localized
                    shipping integrations, CRM systems, and subscription APIs.
                  </p>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-capabilities__layout-8 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-capabilities__layout-9 layout-full is-loaded layout-flex layout">
                <div className="layout-item shopify-capabilities__image-6 width-custom content-block block-image">
                  <div className="content-inner">
                    <CreditCard
                      size={18}
                      aria-hidden="true"
                      className="service-image-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__payment-gateway-engineering content-block block-heading">
                <div className="content-inner">
                  <h3 className="heading">Payment Gateway Engineering</h3>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__seamless-implementation-of-localized content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Reliable implementation of localized payments,
                    multi-currency checkouts, Apple Pay, and automated security
                    fraud guards.
                  </p>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-capabilities__layout-10 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-capabilities__layout-11 layout-full is-loaded layout-flex layout">
                <div className="layout-item shopify-capabilities__image-7 width-custom content-block block-image">
                  <div className="content-inner">
                    <Database
                      size={18}
                      aria-hidden="true"
                      className="service-image-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__inventory-management-erp content-block block-heading">
                <div className="content-inner">
                  <h3 className="heading">Inventory Management &amp; ERP</h3>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__multi-warehouse-real-time-syncing-p content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Multi-warehouse real-time syncing, precise batch stock
                    imports, backorder logic, and automated fulfillment
                    workflows.
                  </p>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-capabilities__layout-12 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-capabilities__layout-13 layout-full is-loaded layout-flex layout">
                <div className="layout-item shopify-capabilities__image-8 width-custom content-block block-image">
                  <div className="content-inner">
                    <TrendingUp
                      size={18}
                      aria-hidden="true"
                      className="service-image-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__conversion-rate-optimization content-block block-heading">
                <div className="content-inner">
                  <h3 className="heading">Conversion Rate Optimization</h3>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__strategic-sticky-cart-drawer-archite content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Strategic sticky cart drawer architecture, lightning
                    checkout widgets, custom post-purchase cross-selling
                    engines, and A/B test setups.
                  </p>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-capabilities__layout-14 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-capabilities__layout-15 layout-full is-loaded layout-flex layout">
                <div className="layout-item shopify-capabilities__image-9 width-custom content-block block-image">
                  <div className="content-inner">
                    <PanelsTopLeft
                      size={18}
                      aria-hidden="true"
                      className="service-image-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__headless-commerce-solutions content-block block-heading">
                <div className="content-inner">
                  <h3 className="heading">Headless Commerce Solutions</h3>
                </div>
              </div>
              <div className="layout-item shopify-capabilities__jamstack-frontend-architecture-hooke content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Jamstack frontend architecture hooked directly to Shopify's
                    high-volume Storefront API for unlimited presentation
                    freedom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopifyCapabilities;
