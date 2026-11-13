import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
const Home = lazy(() => import("./pages/Home"));
const AiAgentsAutomation = lazy(() => import("./pages/AiAgentsAutomation"));
const AiVideoCreation = lazy(() => import("./pages/AiVideoCreation"));
const SaasDevelopment = lazy(() => import("./pages/SaasDevelopment"));
const MobileWebEngineering = lazy(() => import("./pages/MobileWebEngineering"));
const ShopifyEcommerce = lazy(() => import("./pages/ShopifyEcommerce"));
const UiUxDesign = lazy(() => import("./pages/UiUxDesign"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const WordpressDevelopment = lazy(() => import("./pages/WordpressDevelopment"));
const ApiSystemsIntegration = lazy(
  () => import("./pages/ApiSystemsIntegration"),
);
const CustomSoftwareDevelopment = lazy(
  () => import("./pages/CustomSoftwareDevelopment"),
);
const CrmErpSolutions = lazy(() => import("./pages/CrmErpSolutions"));
const CloudDevOps = lazy(() => import("./pages/CloudDevOps"));
const QaTesting = lazy(() => import("./pages/QaTesting"));
const DedicatedProductTeams = lazy(
  () => import("./pages/DedicatedProductTeams"),
);
const ProductDiscoveryStrategy = lazy(
  () => import("./pages/ProductDiscoveryStrategy"),
);
const MaintenanceSupport = lazy(() => import("./pages/MaintenanceSupport"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const BmsEcosystem = lazy(() => import("./pages/BmsEcosystem"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ReDesignLanding = lazy(() => import("./pages/RedesignLandingPage"));
const AdminAuthLayout = lazy(() => import("./pages/admin/AdminAuthLayout"));
const ProtectedRoute = lazy(() => import("./components/sharedUi/ProtectedRoute"));
const PublicOnlyRoute = lazy(() => import("./components/sharedUi/PublicOnlyRoute"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
import NotFound from "./pages/NotFound";
import { paths } from "./routes/paths";
import { caseStudyRoutes } from "./caseStudies/routes";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="route-loader" role="status" aria-label="Loading">
          <span className="ping-loader">
            <span className="ping-loader__pulse ping-loader__pulse--1"></span>
            <span className="ping-loader__pulse ping-loader__pulse--2"></span>
            <span className="ping-loader__pulse ping-loader__pulse--3"></span>

            <span className="ping-loader__dot"></span>
          </span>
        </div>
      }
    >
      <Routes>
        {/* Own header and footer, so it sits outside AppLayout. */}
        <Route path={paths.ReDesignLanding} element={<ReDesignLanding />} />
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.about} element={<AboutUs />} />
          <Route path={paths.contact} element={<Contact />} />
          <Route path={paths.caseStudies} element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<ProjectDetails />} />
          {caseStudyRoutes().flatMap(({ slug, aliases }) =>
            aliases.map((alias) => (
              <Route
                key={alias}
                path={alias}
                element={<ProjectDetails slug={slug} />}
              />
            )),
          )}

          <Route path={paths.bmsEcosystem} element={<BmsEcosystem />} />
          <Route path={paths.services} element={<ServicesPage />} />
          <Route path="/portfolio-case-studies" element={<CaseStudies />} />
          <Route
            path={paths.termsAndConditions}
            element={<TermsAndConditions />}
          />
          <Route path={paths.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={paths.aiAgents} element={<AiAgentsAutomation />} />
          <Route path={paths.aiVideoCreation} element={<AiVideoCreation />} />
          <Route path={paths.saas} element={<SaasDevelopment />} />
          <Route path={paths.mobileWeb} element={<MobileWebEngineering />} />
          <Route path={paths.shopify} element={<ShopifyEcommerce />} />
          <Route path={paths.uiUx} element={<UiUxDesign />} />
          <Route path={paths.webDevelopment} element={<WebDevelopment />} />
          <Route
            path={paths.wordpressDevelopment}
            element={<WordpressDevelopment />}
          />
          <Route
            path={paths.apiSystemsIntegration}
            element={<ApiSystemsIntegration />}
          />
          <Route
            path={paths.customSoftwareDevelopment}
            element={<CustomSoftwareDevelopment />}
          />
          <Route path={paths.crmErpSolutions} element={<CrmErpSolutions />} />
          <Route path={paths.cloudDevOps} element={<CloudDevOps />} />
          <Route path={paths.qaTesting} element={<QaTesting />} />
          <Route
            path={paths.dedicatedProductTeams}
            element={<DedicatedProductTeams />}
          />
          <Route
            path={paths.productDiscoveryStrategy}
            element={<ProductDiscoveryStrategy />}
          />
          <Route
            path={paths.maintenanceSupport}
            element={<MaintenanceSupport />}
          />
          <Route path={paths.accessibility} element={<Accessibility />} />
          <Route path={paths.blog} element={<Blog />} />
          <Route path={paths.blogPost} element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AdminAuthLayout />}>
          <Route
            path={paths.adminLogin}
            element={
              <PublicOnlyRoute>
                <AdminLogin />
              </PublicOnlyRoute>
            }
          />
          <Route
            path={paths.admin}
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/new" element={<AdminBlogEditor />} />
            <Route path="blogs/edit/:id" element={<AdminBlogEditor />} />
            <Route path="categories" element={<AdminCategories />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
