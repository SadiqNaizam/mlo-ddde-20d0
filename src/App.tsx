import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Assetdetailpage from "./pages/Assetdetailpage";
import Authenticationpage from "./pages/Authenticationpage";
import Dashboardpage from "./pages/Dashboardpage";
import Settingspage from "./pages/Settingspage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Dashboardpage />} />
          <Route path="/assetdetailpage" element={<Assetdetailpage />} />
          <Route path="/authenticationpage" element={<Authenticationpage />} />
          <Route path="/settingspage" element={<Settingspage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
