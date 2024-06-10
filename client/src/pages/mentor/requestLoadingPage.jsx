// ConfirmationPage.js
import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
  font-family: Arial, Helvetica, sans-serif;
`;

const MessageCard = styled.div`
  background: #fff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const MessageHeader = styled.h1`
  font-size: 2.5em;
  color: #4caf50;
  margin-bottom: 20px;
`;

const MessageBody = styled.p`
  font-size: 1.2em;
  color: #333;
`;

const ConfirmationPage = () => {
  return (
    <PageContainer>
      <MessageCard>
        <MessageHeader>Application Submitted!</MessageHeader>
        <MessageBody>
          We have received your mentor application. We will review it and confirm your status shortly. Thank you for your patience.
        </MessageBody>
      </MessageCard>
    </PageContainer>
  );
};

export default ConfirmationPage;
