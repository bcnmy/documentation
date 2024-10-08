import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../css/explorer.css";
import "../css/codeblock.css";

type FormValues = {
  paymasterUrl: string;
  userOp: string;
  mode: "SPONSORED" | "ERC20";
  smartAccountName: "BICONOMY" | "INFINITISM" | "SAFE";
  smartAccountVersion: "1.0.0" | "2.0.0" | "1.4.1";
  method: "pm_getFeeQuoteOrData" | "pm_sponsorUserOperation";
  preferredToken: string;
  tokenList: string;
};

export default function Explorer() {
  const [data, setData] = useState(null);
  const [sample, setSample] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const mode = watch("mode");
  const smartAccountName = watch("smartAccountName");

  const validateVersion = (value: string) => {
    if (smartAccountName === "BICONOMY") {
      if (value === "1.0.0") return true;
      if (value === "2.0.0") return true;
      return "Version 1.4.1 only supported on SAFE";
    }
    if (smartAccountName === "INFINITISM") {
      if (value === "1.0.0") return true;
      if (value === "2.0.0") return "Version 2.0.0 only supported on BICONOMY";
      return "Version 1.4.1 only supported on SAFE";
    }
    if (smartAccountName === "SAFE") {
      if (value === "1.4.1") return true;
      if (value === "1.0.0")
        return "Version 1.0.0 only supported on BICONOMY or INFINITISM";
      if (value === "2.0.0") return "Version 2.0.0 only supported on BICONOMY";
    }
    return true;
  };

  const validateJson = (value: string) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return "Invalid JSON object please check the entered UserOp";
    }
  };

  const validatePaymasterURL = (value: string) => {
    const chainIdPattern =
      /https:\/\/paymaster\.biconomy\.io\/api\/v[12]\/(\d+)/;
    const result = value.match(chainIdPattern);

    if (result?.[1]) {
      const chainId = Number.parseInt(result[1], 10);

      // Define the allowed chain IDs
      const allowedChainIds = [
        1, 80002, 137, 97, 56, 1442, 1101, 42161, 42170, 420, 10, 43113, 43114,
        84531, 8453, 59140, 59144, 5000, 5001, 204, 5611, 88888, 592, 88882, 81,
        1115, 1116, 169, 3441005, 91715, 9980, 421614, 11155111, 84532,
        168587773, 80085, 81457, 534351, 534352, 56400, 7000, 11155420,
      ];

      // Check if the extracted chain ID is within the allowed values
      const allowed = allowedChainIds.includes(chainId);
      if (allowed) return true;
      if (!allowed) return "Only testnet chains are allowed in explorer";
    }

    // If no match was found, return false
    return "Paymaster URL incorrect";
  };

  function convertAddressesToArray(_addressesString: string) {
    // Trim the input string to remove any leading/trailing white spaces
    const addressesString = _addressesString.trim();

    // Split the string by commas followed by an optional white space to get each address
    const addressesArray = addressesString.split(/\s*,\s*/);

    // Return the array of addresses
    return addressesArray;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data Submitted:", data);
    console.log(JSON.parse(data.userOp));
    const userOp = JSON.parse(data.userOp);
    if (data.mode === "SPONSORED") {
      const raw = {
        jsonrpc: "2.0",
        method: data.method,
        id: 1,
        params: [
          {
            ...userOp,
          },
          {
            mode: data.mode,
            sponsorshipInfo: {
              webhookData: {},
              smartAccountInfo: {
                name: data.smartAccountName,
                version: data.smartAccountVersion,
              },
            },
          },
        ],
      };
      if (data.method === "pm_sponsorUserOperation") {
        raw.params[1].expiryDuration = 300; //5mins
        raw.params[1].calculateGasLimits = true;
      }
      const formattedRequest = JSON.stringify(raw, null, 2);
      setSample(formattedRequest);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formattedRequest,
      };
      fetch(data.paymasterUrl, requestOptions)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => setData(error));
    } else if (data.mode === "ERC20") {
      const raw = {
        jsonrpc: "2.0",
        method: "pm_getFeeQuoteOrData",
        id: 1,
        params: [
          {
            ...userOp,
          },
          {
            mode: "ERC20",
            tokenInfo: {
              preferredToken: data.preferredToken,
              tokenList: convertAddressesToArray(data.tokenList),
            },
          },
        ],
      };
      if (data.method === "pm_sponsorUserOperation") {
        raw.params[1].expiryDuration = 300; //5mins
        raw.params[1].calculateGasLimits = true;
      }
      const formattedRequest = JSON.stringify(raw, null, 2);
      setSample(formattedRequest);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formattedRequest,
      };
      fetch(data.paymasterUrl, requestOptions)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => setData(error));
    }
  };

  useEffect(() => {
    const raw = JSON.stringify(
      {
        jsonrpc: "2.0",
        method: "pm_getFeeQuoteOrData",
        id: 1,
        params: [
          {
            sender: "0x0000000000000000000000000000000000000000",
            nonce: "0x",
            initCode: "0x",
            callData: "0x",
            signature: "0x",
            maxFeePerGas: "0x",
            maxPriorityFeePerGas: "0x",
            verificationGasLimit: "0x",
            callGasLimit: "0x",
            preVerificationGas: "0x",
            paymasterAndData: "0x",
          },
          {
            mode: "SPONSORED",
            sponsorshipInfo: {
              webhookData: {},
              smartAccountInfo: {
                name: "BICONOMY",
                version: "1.0.0",
              },
            },
          },
        ],
      },
      null,
      2
    );
    setSample(raw);
  }, []);

  return (
    <div>
      <div className="requestContainer">
        <div className="formContainer">
          <h2>Edit Request</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="inputLabel">Method</label>
            <select
              {...register("method", { required: true })}
              className="inputField"
            >
              <option value="pm_getFeeQuoteOrData">pm_getFeeQuoteOrData</option>
              <option value="pm_sponsorUserOperation">
                pm_sponsorUserOperation
              </option>
            </select>
            <label className="inputLabel">Paymaster URL</label>
            <input
              {...register("paymasterUrl", {
                required: "Paymaster URL is required",
                validate: (value) => validatePaymasterURL(value),
              })}
              type="text"
              placeholder="Paymaster URL"
              className="inputField"
            />
            {errors.paymasterUrl && (
              <p className="errorMsg">{errors.paymasterUrl.message}</p>
            )}
            <label className="inputLabel">UserOp</label>

            <textarea
              {...register("userOp", {
                required: "UserOp object is required",
                validate: (value) => validateJson(value),
              })}
              placeholder="UserOp Object"
              className="inputField"
              rows={5}
            />
            {errors.userOp && (
              <p className="errorMsg">{errors.userOp.message}</p>
            )}
            <label className="inputLabel">Paymaster Mode</label>
            <select
              {...register("mode", { required: true })}
              className="inputField"
            >
              <option value="SPONSORED">SPONSORED</option>
              <option value="ERC20">ERC20</option>
            </select>

            <label className="inputLabel">Smart Account Name</label>
            <select
              {...register("smartAccountName", { required: true })}
              className="inputField"
            >
              <option value="BICONOMY">BICONOMY</option>
              <option value="INFINITISM">INFINITISM</option>
              <option value="SAFE">SAFE</option>
            </select>

            <label className="inputLabel">Smart Account Version</label>
            <select
              {...register("smartAccountVersion", {
                validate: (value) => validateVersion(value),
              })}
              className="inputField"
            >
              <option value="1.0.0">1.0.0</option>
              <option value="1.4.1">1.4.1</option>
              <option value="2.0.0">2.0.0</option>
            </select>
            {errors.smartAccountVersion && (
              <p className="errorMsg">{errors.smartAccountVersion.message}</p>
            )}

            {mode === "ERC20" && (
              <>
                <label className="inputLabel">Preferred Token</label>
                <input
                  {...register("preferredToken", {
                    required: "Preferred token address is required",
                  })}
                  type="text"
                  placeholder="Preferred Token Address"
                  className="inputField"
                />
              </>
            )}
            {errors.preferredToken && (
              <p className="errorMsg">{errors.preferredToken.message}</p>
            )}

            {mode === "ERC20" && (
              <>
                <label className="inputLabel">Token List</label>
                <input
                  {...register("tokenList")}
                  type="text"
                  placeholder="Token List (comma separated)"
                  className="inputField"
                />
              </>
            )}
            {errors.tokenList && (
              <p className="errorMsg">{errors.tokenList.message}</p>
            )}

            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>
        </div>
        {sample && (
          <div>
            <h2>Sample Request</h2>
            <pre><code className="hljs requestBlock">
              {sample}
            </code></pre>
          </div>
        )}
      </div>
      {data && (
        <div>
          <h2>Sample Response</h2>
          <pre><code className="hljs">
            {`${JSON.stringify(data, null, 2)}`}
          </code></pre>
        </div>
      )}
    </div>
  );
}
