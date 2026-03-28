import { motion } from "framer-motion";
import { Wrench, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Placeholder({ title }: { title: string }) {
  const navigate = useNavigate();
  
  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center text-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-full bg-primary/10 p-6 mb-6">
          <Wrench className="h-16 w-16 text-primary" />
        </div>
      </motion.div>
      
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We're currently building out this feature. Check back soon for exciting updates to your adaptive learning experience!
      </p>
      
      <Button onClick={() => navigate("/dashboard")} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Button>
    </div>
  );
}
