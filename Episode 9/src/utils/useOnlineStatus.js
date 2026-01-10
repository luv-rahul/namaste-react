import { useEffect, useState } from "react";

export const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  /* Check Online or Offline */
  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });

    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });
  }, []);

  return onlineStatus;
};
