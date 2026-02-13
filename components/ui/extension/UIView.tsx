import CodePreview from "@/components/ui/CodePreview";

const stylingSwiftCode = `import UIKit

extension UIView {

    var cornerRadius: CGFloat {
        get { layer.cornerRadius }
        set {
            layer.cornerRadius = newValue
            clipsToBounds = newValue > 0
        }
    }

    var borderWidth: CGFloat {
        get { layer.borderWidth }
        set { layer.borderWidth = newValue }
    }

    var borderColor: UIColor? {
        get { layer.borderColor.map { UIColor(cgColor: $0) } }
        set { layer.borderColor = newValue?.cgColor }
    }

    func addShadow(
        color: UIColor = .black,
        opacity: Float = 0.15,
        offset: CGSize = CGSize(width: 0, height: 6),
        radius: CGFloat = 12
    ) {
        layer.shadowColor = color.cgColor
        layer.shadowOpacity = opacity
        layer.shadowOffset = offset
        layer.shadowRadius = radius
        layer.masksToBounds = false
    }

    func addGradient(
        colors: [UIColor],
        startPoint: CGPoint = CGPoint(x: 0, y: 0.5),
        endPoint: CGPoint = CGPoint(x: 1, y: 0.5),
        cornerRadius: CGFloat = 0
    ) {
        layer.sublayers?.removeAll(where: { $0.name == "app.gradient.layer" })

        let gradient = CAGradientLayer()
        gradient.name = "app.gradient.layer"
        gradient.frame = bounds
        gradient.colors = colors.map { $0.cgColor }
        gradient.startPoint = startPoint
        gradient.endPoint = endPoint
        gradient.cornerRadius = cornerRadius
        layer.insertSublayer(gradient, at: 0)
    }

    func roundCorners(_ corners: UIRectCorner, radius: CGFloat) {
        let path = UIBezierPath(
            roundedRect: bounds,
            byRoundingCorners: corners,
            cornerRadii: CGSize(width: radius, height: radius)
        )
        let mask = CAShapeLayer()
        mask.path = path.cgPath
        layer.mask = mask
    }
}

// MARK: - Usage
cardView.cornerRadius = 16
cardView.borderWidth = 1
cardView.borderColor = .systemGray4
cardView.addShadow(opacity: 0.2, radius: 14)

gradientView.addGradient(
    colors: [.systemBlue, .systemPurple],
    startPoint: CGPoint(x: 0, y: 0),
    endPoint: CGPoint(x: 1, y: 1),
    cornerRadius: 12
)

headerView.roundCorners([.topLeft, .topRight], radius: 16)
`;

const animationSwiftCode = `import UIKit

extension UIView {

    func fadeIn(duration: TimeInterval = 0.25) {
        alpha = 0
        isHidden = false
        UIView.animate(withDuration: duration) {
            self.alpha = 1
        }
    }

    func fadeOut(duration: TimeInterval = 0.25) {
        UIView.animate(
            withDuration: duration,
            animations: {
                self.alpha = 0
            },
            completion: { _ in
                self.isHidden = true
            }
        )
    }

    func shake(duration: CFTimeInterval = 0.4, repeatCount: Float = 2) {
        let animation = CAKeyframeAnimation(keyPath: "transform.translation.x")
        animation.values = [-8, 8, -6, 6, -3, 3, 0]
        animation.duration = duration
        animation.repeatCount = repeatCount
        layer.add(animation, forKey: "app.shake")
    }

    func pulse(scale: CGFloat = 1.05, duration: TimeInterval = 0.18) {
        UIView.animate(
            withDuration: duration,
            animations: {
                self.transform = CGAffineTransform(scaleX: scale, y: scale)
            },
            completion: { _ in
                UIView.animate(withDuration: duration) {
                    self.transform = .identity
                }
            }
        )
    }
}

// MARK: - Usage
errorField.shake()
ctaButton.pulse()
loadingView.fadeIn()
loadingView.fadeOut()
`;

export default function UIViewExtension() {
  return (
    <div className="space-y-4">
      <CodePreview
        title="UIView Styling Extensions"
        description="Corner, border, shadow, gradient, and selective corner rounding."
        swiftCode={stylingSwiftCode}
        preview={
          <div className="w-full max-w-md space-y-4">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                UIView Styling
              </p>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                cornerRadius, borderWidth, borderColor, addShadow, addGradient, roundCorners.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-3 shadow-[0_14px_28px_-18px_rgba(15,23,42,0.45)] border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
                <p className="text-xs text-neutral-500">Shadow</p>
                <p className="mt-1 text-sm font-semibold">Card</p>
              </div>
              <div className="rounded-2xl border border-neutral-300 p-3 bg-white dark:bg-neutral-900 dark:border-neutral-700">
                <p className="text-xs text-neutral-500">Border</p>
                <p className="mt-1 text-sm font-semibold">Outlined</p>
              </div>
              <div className="col-span-2 rounded-2xl p-3 text-white bg-gradient-to-r from-blue-500 to-indigo-500">
                <p className="text-xs opacity-80">Gradient</p>
                <p className="mt-1 text-sm font-semibold">Action Surface</p>
              </div>
            </div>
          </div>
        }
      />

      <CodePreview
        title="UIView Animation Extensions"
        description="Common micro interactions for feedback and state transitions."
        swiftCode={animationSwiftCode}
        preview={
          <div className="w-full max-w-md space-y-3">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                UIView Animations
              </p>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                fadeIn, fadeOut, shake, and pulse helpers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900">
                Fade
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900">
                Shake
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900">
                Pulse
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
