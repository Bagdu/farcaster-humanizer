import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { VerificationLevel, IDKitWidget } from '@worldcoin/idkit';
import { WORLDCOIN_APP_ID } from '../settings';
import { useAccount } from 'wagmi';
import Button from "react-bootstrap/Button";

function Verify() {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const onSuccess = async (result: any) => {
    console.log('nullifier_hash', result.nullifier_hash);
    setLoading(true);
    // try {
    //   await verifyProof(result, selectedCandidate);
    // } catch (e) {
    //   console.error(e);
    //   if (e instanceof Error) {
    //     if (e.message.includes('Error: InvalidNullifier()')) {
    //       alert('You have already voted for this candidate');
    //     } else alert(e.message);
    //   } else alert(e);
    // } finally {
    //   setLoading(false);
    //   await refetch();
    // }
  };

  return (
    <>
      <IDKitWidget
        app_id={WORLDCOIN_APP_ID} // obtained from the Developer Portal
        action="verify-human" // this is your action name from the Developer Portal
        signal={address}
        onSuccess={onSuccess} // callback when the modal is closed
        verification_level={VerificationLevel.Orb}// optional, defaults to ['orb']
      >
        {({ open }) => {
          return (
              <Button
                  onClick={open}
              >
                Verify with World ID
              </Button>
          );
        }}
      </IDKitWidget>
      <Modal show={loading} centered>
        <Modal.Body className="text-center">
          <h4>Processing...</h4>
          <p>Please wait while your vote is being processed</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Verify;
