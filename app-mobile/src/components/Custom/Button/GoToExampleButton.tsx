import React, { PureComponent } from 'react';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import Button from '../../Common/Button/DefaultButton';

class GoToExampleButton extends PureComponent {
  render() {
    return (
      <Button
        title="Go to Example"
        height={50}
        bold
        onPress={
        () => NavigationService.navigate(rootStack.exampleStack)
      }
      />
    );
  }
}

export default GoToExampleButton;
