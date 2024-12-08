export const Modal = ({ isOpen, children } : any) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-16 rounded-lg shadow-lg w-1/3 flex items-center justify-center flex-col" >
          <div className="flex flex-col items-center justify-center w-[100%]">
            {children}
          </div>
        </div>
      </div>
    );
  };