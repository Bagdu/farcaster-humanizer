// @ts-ignore
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { VerificationLevel, IDKitWidget, solidityEncode } from '@worldcoin/idkit';
import { WORLDCOIN_APP_ID } from '../settings';
import Button from "react-bootstrap/Button";
import useVerifyProof from "../hooks/UseVerifyProof";
import { useParams } from 'react-router-dom';

export function VerifyFid() {
  let params = useParams();
  const fid = Number(params.fid)

  const [loading, setLoading] = useState(false);

  const { verifyProof, checkVerifyProof } = useVerifyProof();

  const checkVerification = async () => {
    try {
      const result = await checkVerifyProof(fid);
      if (result) {
        alert(`Your Fid ${fid} has been verified`)
      } else{
        alert(`Your Fid ${fid} has not been verified`)
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        if (e.message.includes('Error: InvalidNullifier()')) {
          alert('You Have Already Verified on this fid');
        } else alert(e.message);
      } else alert(e);
    }
  }

  const onSuccess = async (result: any) => {
    setLoading(true);
    try {
      await verifyProof(result, fid);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        if (e.message.includes('Error: InvalidNullifier()')) {
          alert('You Have Already Verified on this fid');
        } else alert(e.message);
      } else alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <label> Farcaster id (FID) </label>
        <input
          style={styles.input}
          value={fid}
          type="number"
        />
        <IDKitWidget
          app_id={WORLDCOIN_APP_ID} // obtained from the Developer Portal
          action="verify-human" // this is your action name from the Developer Portal
          signal={
            solidityEncode(["uint256"], [fid])
            }
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
        {'  '}
        <Button
          onClick={checkVerification}
        >
          Check Address
        </Button>
      </div>
    </>
  );
}

export default VerifyFid;

const styles = ({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
