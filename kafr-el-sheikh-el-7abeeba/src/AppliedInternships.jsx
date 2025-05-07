import React from "react";
import Listings from "./Listings";

export default function AppliedInternships({ appliedInternships }) {
  return (
    <Listings
      showApplyButton={false}
      onlyShowApplied={true}
      appliedInternships={appliedInternships}
    />
  );
}
