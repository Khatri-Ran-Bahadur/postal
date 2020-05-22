import styled from "styled-components";
export const ContactDiv = styled.section`
  padding: 10px;

  .contact-card {
    color: black !important;
    padding-left: 10px;
    padding-right: 10px;
  }
  .map-card {
    margin-top: 1em;
    padding-left: 1em;
    padding-right: 1em;
  }
  .title {
    font-weight: 800;
    font-size: 1.3em;
    color: #0a7fc9;
    text-transform: uppercase;
  }
  .details {
    display: flex;
    margin: 1em 0;
    svg {
      min-width: 18px;
      min-height: 18px;
    }

    align-items: center;
    span {
      margin-left: 8px;
    }
  }
  .hex-wrapper {
    display: flex;
    .hexagon {
      margin: 0 1em;
    }
  }
  .social-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  .social {
    width: 100%;
    padding-left: 1.4em;
    padding-right: 1em;
  }
  .social-media {
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 0.5em;
    border-radius: 11px;
    cursor: pointer;
    &:hover {
      background: rgb(0, 0, 0, 0.1);
    }
  }
`;

export const ContactFormDiv = styled.div`
  .info {
    text-align: center;
    padding: 4px;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .error {
    width: 100%;

    margin-bottom: 0.25rem;
    margin-left: 0.8rem;

    font-size: 80%;
    color: #dc3545;
  }

  .form-control {
    margin-bottom: 0 !important;
  }

  .form-card {
    margin: 1em;
  }
`;
