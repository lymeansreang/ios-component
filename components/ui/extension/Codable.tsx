import CodePreview from "@/components/ui/CodePreview";

const swiftCode = `import Foundation

enum CodableHelperError: Error {
    case missingFile(String)
}

extension Decodable {
    static func decode(from data: Data, decoder: JSONDecoder = JSONDecoder()) throws -> Self {
        try decoder.decode(Self.self, from: data)
    }

    static func loadJSON(
        fromFile fileName: String,
        bundle: Bundle = .main,
        decoder: JSONDecoder = JSONDecoder()
    ) throws -> Self {
        guard let url = bundle.url(forResource: fileName, withExtension: "json") else {
            throw CodableHelperError.missingFile(fileName + ".json")
        }
        let data = try Data(contentsOf: url)
        return try decoder.decode(Self.self, from: data)
    }
}

extension Encodable {
    func encodeToData(encoder: JSONEncoder = JSONEncoder()) throws -> Data {
        try encoder.encode(self)
    }
}

// MARK: - Usage
struct User: Codable {
    let id: Int
    let name: String
}

// decode(from:)
let raw = #"{"id":1,"name":"Ayla"}"#.data(using: .utf8)!
let user = try User.decode(from: raw)

// encodeToData()
let encoded = try user.encodeToData()

// load JSON from file (e.g. User.json in bundle)
let bundledUser = try User.loadJSON(fromFile: "User")
`;

export default function CodableExtension() {
  return (
    <CodePreview
      title="Codable Helpers"
      description="Small helpers for decoding, encoding, and loading JSON from bundle files."
      swiftCode={swiftCode}
      preview={
        <div className="w-full max-w-md space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Codable Toolkit
            </p>
            <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">
              Decode / Encode / Load JSON
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Reusable helpers for cleaner model parsing and persistence workflows.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-4">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              Common calls
            </p>
            <p className="mt-2 text-xs text-neutral-500">`User.decode(from: data)`</p>
            <p className="text-xs text-neutral-500">`user.encodeToData()`</p>
            <p className="text-xs text-neutral-500">`User.loadJSON(fromFile: &quot;User&quot;)`</p>
          </div>
        </div>
      }
    />
  );
}
