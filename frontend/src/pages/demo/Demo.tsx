import React, { useState } from 'react';
import { SignInButton } from "@farcaster/auth-kit";
import { useVerified } from 'farcaster-humanizer';
import { Image } from 'react-bootstrap';

export function Demo() {
  const [showLabel, setShowLabel] = useState(false)
  const [verifiedHuman, setVerifiedHuman] = useState(false)

  const { isVerified } = useVerified({})


  return (
    <>
      <div className="text-center">
        <h3 className="headline">
          Demo application
        </h3>

        <label className="label">
          Scan QR code
        </label>

      </div>

      <div>
        <div className="centered">
          <SignInButton
            onSuccess={
              async ({ fid, username }) => {
                setShowLabel(true)
                setVerifiedHuman(await isVerified(Number(fid)))
              }
            }
          />
        </div>

        <div hidden={!showLabel}>
          <div hidden={!verifiedHuman}>
            <Image src="/images/verified.png" height={28} className="me-lg-3" />
            <label className="label">
              verified human
            </label>
          </div>

          <div hidden={verifiedHuman}>
            <Image src="/images/not-verified.jpg" height={28} className="me-lg-3" />
            <label className="label">
              not verified human
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
