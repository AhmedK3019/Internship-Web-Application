import React from "react";
import Listings from "./Listings";

export default function AppliedInternships({ appliedInternships, setView }) {
  return (
    <Listings
      showApplyButton={false}
      onlyShowApplied={true}
      appliedInternships={appliedInternships}
      setView={setView}
    />
  );
}
