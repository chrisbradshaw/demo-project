import React, { useEffect } from 'react';
import { AdSlot, DFPManager } from 'react-dfp';

function Ad() {
  useEffect(() => {
    DFPManager.setTargetingArguments({
      pagetype: 'homepage',
      cat: 'Boats',
      subcat: '',
      adtype: '',
      make: 'Maritomo',
      model: '',
      location: 'Queensland',
      price: '',
      year: '',
    });
    DFPManager.load('gam_footer_pos3');
  }, []);

  return (
    <div className="gam_footer_pos3 ad-position">
      <AdSlot
        slotId="gam_footer_pos3"
        sizes={[
          [320, 50],
          [728, 90],
        ]}
        sizeMapping={[
          {
            viewport: [1280, 0],
            sizes: [
              [970, 90],
              [728, 90],
            ],
          },
          { viewport: [769, 0], sizes: [[728, 90]] },
          {
            viewport: [0, 0],
            sizes: [[320, 50]],
          },
        ]}
        targetingArguments={{ pos: '3' }}
      />
    </div>
  );
}

export { Ad };
