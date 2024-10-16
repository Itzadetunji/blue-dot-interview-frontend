import React from "react";
import { createRoot } from "react-dom/client";
import QueryClientConfig from "./configs/QueryClientConfig.tsx";
import "./styles/index.css";
import Routes from "./Routes.tsx";

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientConfig>
			<Routes />
		</QueryClientConfig>
	</React.StrictMode>
);
