import React, { useEffect } from "react";
import Spinner from "../../components/Common/Spinner";
function AdminRedirection() {
  useEffect(() => {
    window.location.href = "http://salyan.postalservice.gov.np/admin/wp-admin";
  });
  return (
    <div>
      <Spinner />
    </div>
  );
}

export default AdminRedirection;
