import CodePreview from "@/components/ui/CodePreview";

const swiftCode = `import Foundation

// MARK: - String+Localize
extension String {

    /// Look up this key in Localizable.strings (default table).
    var localized: String {
        NSLocalizedString(self, comment: "")
    }

    /// Look up with a specific table name.
    func localized(table: String) -> String {
        NSLocalizedString(self, tableName: table, comment: "")
    }

    /// Look up with arguments (e.g. "Hello, %@").
    func localized(with arguments: CVarArg...) -> String {
        String(format: localized, arguments: arguments)
    }

    /// Look up from a specific table with arguments.
    func localized(table: String, with arguments: CVarArg...) -> String {
        String(format: localized(table: table), arguments: arguments)
    }

    /// Look up from a specific bundle (useful for frameworks / SPM modules).
    func localized(bundle: Bundle) -> String {
        NSLocalizedString(self, bundle: bundle, comment: "")
    }
}

// MARK: - Usage

// 1) Simple key lookup  (Localizable.strings)
//    "welcome_title" = "Welcome Back!";
let title = "welcome_title".localized

// 2) Formatted string
//    "greeting" = "Hello, %@!";
let greeting = "greeting".localized(with: "Ayla")

// 3) Pluralised / numbered format
//    "items_count" = "You have %d items";
let itemsLabel = "items_count".localized(with: 5)

// 4) Separate table  (Profile.strings)
//    "edit_profile" = "Edit Profile";
let editProfile = "edit_profile".localized(table: "Profile")

// 5) From another bundle
let frameworkString = "onboarding_title".localized(bundle: .module)
`;

export default function LocalizeExtension() {
  return (
    <CodePreview
      title="Localize"
      description="Lightweight String extensions for NSLocalizedString lookups with format support."
      swiftCode={swiftCode}
      preview={
        <div className="w-full max-w-md space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Localize Toolkit
            </p>
            <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">
              String + NSLocalizedString
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Clean, chainable helpers for localising any string key across
              tables and bundles.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-4 space-y-3">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              Common patterns
            </p>
            <div className="space-y-1.5">
              <p className="text-xs font-mono text-neutral-500">
                &quot;welcome_title&quot;.localized
              </p>
              <p className="text-xs font-mono text-neutral-500">
                &quot;greeting&quot;.localized(with: &quot;Ayla&quot;)
              </p>
              <p className="text-xs font-mono text-neutral-500">
                &quot;items_count&quot;.localized(with: 5)
              </p>
              <p className="text-xs font-mono text-neutral-500">
                &quot;edit_profile&quot;.localized(table: &quot;Profile&quot;)
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}
