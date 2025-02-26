import * as React from 'react';

import type { IReferralProps } from './IReferralProps';


import Gym from './Gym';

export default class Referral extends React.Component<IReferralProps> {
  public render(): React.ReactElement<IReferralProps> {
    const {
      
    } = this.props;

    return (
      <Gym/>
    );
  }
}
