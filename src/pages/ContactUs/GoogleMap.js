import React from 'react'
import { Content } from "../../components/Common/Content";
const GoogleMap = () => {
  return (
    <div>
      <Content
        style={{ width: "100%" }}
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d714.2133462392868!2d82.16145287731501!3d28.373918979145348!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3998017268b71a99%3A0x334413bede839791!2sDistrict%20Post%20Office!5e1!3m2!1sen!2snp!4v1585025452261!5m2!1sen!2snp" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`
        }}
      ></Content>
    </div>
  );
}

export default GoogleMap
