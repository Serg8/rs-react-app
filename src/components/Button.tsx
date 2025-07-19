import { Component, type ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'default' | 'danger';
}

class Button extends Component<ButtonProps> {
  static defaultProps = {
    variant: 'default',
  };

  render() {
    const { onClick, children, variant, ...rest } = this.props;

    const baseClasses = 'py-2 px-4 border';
    const variantClasses =
      variant === 'danger'
        ? 'border-red-400 text-red-600 hover:bg-red-50'
        : 'border-gray-300 hover:bg-gray-50';

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
}

export default Button;
