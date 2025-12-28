import {useAnyOneFindParcelQuery} from "@/redux/features/parcel/parcel.api";
import {useState} from "react";
import Faq from "./home/Faq";

const GetStarted = () => {
  const [trackingId, setTrackingId] = useState<string>("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {data, isLoading, isError} = useAnyOneFindParcelQuery(submittedId!, {skip: !submittedId});

  const parcel = data?.data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (trackingId.trim()) setSubmittedId(trackingId.trim());
  };

  return (
    <>
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">🔍 Find Your Parcel</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID"
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
            Submit
          </button>
        </form>

        {isLoading && <p className="my-10 text-center">Loading parcel info...</p>}
        {isError && <p className="mt-4 text-red-500">Parcel not found or error occurred.</p>}

        {parcel && !isLoading && (
          <div className="mt-6 p-4 border rounded shadow">
            <h3 className="text-lg font-bold">📦 {parcel.title}</h3>

            {parcel?.statusLog?.map((item: {timestamp: Date; updatedBy: string; status: string; location: string; note: string}, index: number) => (
              <div key={index} className="my-3 p-3">
                <p>
                  <strong>Status:</strong> {item?.status || "No status available"}
                </p>
                <p>
                  <strong>Updated By:</strong> {item?.updatedBy || "N/A"}
                </p>
                <p>
                  <strong>location:</strong> {item?.location || "N/A"}
                </p>
                <p>
                  <strong>note:</strong> {item?.note || "N/A"}
                </p>

                <p>
                  <strong>Time stamp: </strong>
                  {new Date(item.timestamp).toLocaleString("en-BD")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Faq></Faq>
    </>
  );
};

export default GetStarted;
