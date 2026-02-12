import CodePreview from "@/components/ui/CodePreview";

const swiftCode = `import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        return true
    }
}

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(
        _ scene: UIScene,
        willConnectTo session: UISceneSession,
        options connectionOptions: UIScene.ConnectionOptions
    ) {
        guard let windowScene = scene as? UIWindowScene else { return }

        let rootVC = HomeViewController()
        let nav = UINavigationController(rootViewController: rootVC)
        nav.navigationBar.prefersLargeTitles = true

        let window = UIWindow(windowScene: windowScene)
        window.rootViewController = nav
        window.makeKeyAndVisible()
        self.window = window
    }
}

final class HomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Home"
        view.backgroundColor = .hex("#FFFFFF")

        let button = UIButton(type: .system)
        button.setTitle("Open Details", for: .normal)
        button.addTarget(self, action: #selector(openDetails), for: .touchUpInside)

        button.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(button)
        NSLayoutConstraint.activate([
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            button.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func openDetails() {
        let details = DetailsViewController()
        navigationController?.pushViewController(details, animated: true)
    }
}

final class DetailsViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Details"
        view.backgroundColor = .hex("#F5F5F5")
    }
}
`;

export default function BasicNavigation() {
  return (
    <CodePreview
      title="Basic Navigation"
      description="AppDelegate + SceneDelegate setup with a UINavigationController root."
      swiftCode={swiftCode}
      preview={
        <div className="w-full max-w-md space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              App & Scene
            </p>
            <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">
              Basic UIKit navigation stack
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Start with a root navigation controller and push a detail screen
              from your first view controller.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <span>Home</span>
              <span>Large title</span>
            </div>
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
              Open Details
            </div>
            <div className="text-xs text-neutral-400">
              Push to `DetailsViewController`
            </div>
          </div>
        </div>
      }
    />
  );
}
