import React from "react";
import ExampleContext from "./context/ExampleContext";
import ExampleContent from "./ExampleContent";

const Example = () => {
	return (
		<ExampleContext>
			<ExampleContent />
		</ExampleContext>
	);
};
export default Example;
