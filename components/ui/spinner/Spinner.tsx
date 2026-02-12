import CodePreview from "@/components/ui/CodePreview";

const swiftCode = `import SwiftUI

enum SpinnerVariant {
    case ring, arc, dots, bars, pulse, sonar, orbit, infinity
}

struct SpinnerView: View {
    var variant: SpinnerVariant = .ring
    var tint: Color = .blue
    @State private var spin = false

    var body: some View {
        Group {
            switch variant {
            case .ring:
                ring(lineWidth: 4, trimTo: 0.72)
            case .arc:
                ring(lineWidth: 5, trimTo: 0.35)
            case .dots:
                dots
            case .bars:
                bars
            case .pulse:
                pulse
            case .sonar:
                sonar
            case .orbit:
                orbit
            case .infinity:
                infinity
            }
        }
        .frame(width: 34, height: 34)
        .onAppear { spin = true }
    }

    @ViewBuilder
    private func ring(lineWidth: CGFloat, trimTo: CGFloat) -> some View {
        Circle()
            .trim(from: 0, to: trimTo)
            .stroke(tint, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
            .rotationEffect(.degrees(spin ? 360 : 0))
            .animation(.linear(duration: 1).repeatForever(autoreverses: false), value: spin)
    }

    private var dots: some View {
        HStack(spacing: 4) {
            ForEach(0..<3) { index in
                Circle()
                    .fill(tint)
                    .frame(width: 7, height: 7)
                    .scaleEffect(spin ? 0.55 : 1)
                    .animation(
                        .easeInOut(duration: 0.45)
                            .repeatForever(autoreverses: true)
                            .delay(Double(index) * 0.15),
                        value: spin
                    )
            }
        }
    }

    private var bars: some View {
        HStack(spacing: 3) {
            ForEach(0..<5) { index in
                RoundedRectangle(cornerRadius: 2)
                    .fill(tint)
                    .frame(width: 3, height: 18)
                    .scaleEffect(y: spin ? 0.4 : 1.0, anchor: .center)
                    .animation(
                        .easeInOut(duration: 0.55)
                            .repeatForever(autoreverses: true)
                            .delay(Double(index) * 0.1),
                        value: spin
                    )
            }
        }
    }

    private var pulse: some View {
        ZStack {
            Circle()
                .stroke(tint.opacity(0.45), lineWidth: 3)
                .scaleEffect(spin ? 1.3 : 0.7)
                .opacity(spin ? 0.0 : 1.0)
                .animation(.easeOut(duration: 1.05).repeatForever(autoreverses: false), value: spin)
            Circle()
                .fill(tint)
                .frame(width: 8, height: 8)
        }
    }

    private var sonar: some View {
        ZStack {
            ForEach(0..<2) { index in
                Circle()
                    .stroke(tint.opacity(0.5), lineWidth: 2.5)
                    .scaleEffect(spin ? 1.8 : 0.2)
                    .opacity(spin ? 0 : 1)
                    .animation(
                        .easeOut(duration: 1.4)
                            .repeatForever(autoreverses: false)
                            .delay(Double(index) * 0.45),
                        value: spin
                    )
            }
            Circle().fill(tint).frame(width: 7, height: 7)
        }
    }

    private var orbit: some View {
        ZStack {
            Circle().stroke(tint.opacity(0.2), lineWidth: 2)
            Circle()
                .fill(tint)
                .frame(width: 7, height: 7)
                .offset(y: -14)
                .rotationEffect(.degrees(spin ? 360 : 0))
                .animation(.linear(duration: 1.1).repeatForever(autoreverses: false), value: spin)
        }
    }

    private var infinity: some View {
        Image(systemName: "infinity")
            .font(.system(size: 22, weight: .semibold))
            .foregroundStyle(tint)
            .rotationEffect(.degrees(spin ? 360 : 0))
            .animation(.linear(duration: 1.7).repeatForever(autoreverses: false), value: spin)
    }
}

// MARK: - Usage
struct SpinnerDemo: View {
    var body: some View {
        VStack(spacing: 16) {
            SpinnerView(variant: .ring, tint: .blue)
            SpinnerView(variant: .dots, tint: .green)
            SpinnerView(variant: .sonar, tint: .pink)
        }
        .padding(24)
    }
}
`;

const uikitCode = `import UIKit

enum SpinnerVariant {
    case ring, arc, dots, bars, pulse, sonar, orbit, infinity
}

final class SpinnerView: UIView {
    private let variant: SpinnerVariant
    private let tint: UIColor

    init(variant: SpinnerVariant = .ring, tint: UIColor = .systemBlue) {
        self.variant = variant
        self.tint = tint
        super.init(frame: .zero)
        translatesAutoresizingMaskIntoConstraints = false
        build()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func build() {
        switch variant {
        case .ring: addRing(trimmed: true)
        case .arc: addRing(trimmed: false)
        case .dots: addDots()
        case .bars: addBars()
        case .pulse: addPulse()
        case .sonar: addSonar()
        case .orbit: addOrbit()
        case .infinity: addInfinity()
        }
    }

    private func addRing(trimmed: Bool) {
        let shape = CAShapeLayer()
        let center = CGPoint(x: 17, y: 17)
        let radius: CGFloat = 12
        let start: CGFloat = -.pi / 2
        let end: CGFloat = trimmed ? (1.1 * .pi) : (.pi / 2)
        shape.path = UIBezierPath(arcCenter: center, radius: radius, startAngle: start, endAngle: end, clockwise: true).cgPath
        shape.strokeColor = tint.cgColor
        shape.fillColor = UIColor.clear.cgColor
        shape.lineWidth = trimmed ? 4 : 5
        shape.lineCap = .round
        layer.addSublayer(shape)

        let spin = CABasicAnimation(keyPath: "transform.rotation.z")
        spin.fromValue = 0
        spin.toValue = 2 * Double.pi
        spin.duration = 1
        spin.repeatCount = .infinity
        layer.add(spin, forKey: "spin")
    }

    private func addDots() {
        for i in 0..<3 {
            let dot = UIView(frame: CGRect(x: 7 + i * 10, y: 14, width: 7, height: 7))
            dot.layer.cornerRadius = 3.5
            dot.backgroundColor = tint
            addSubview(dot)

            let anim = CABasicAnimation(keyPath: "transform.scale")
            anim.fromValue = 1
            anim.toValue = 0.55
            anim.duration = 0.45
            anim.autoreverses = true
            anim.repeatCount = .infinity
            anim.beginTime = CACurrentMediaTime() + Double(i) * 0.15
            dot.layer.add(anim, forKey: "dotPulse")
        }
    }

    private func addBars() {
        for i in 0..<5 {
            let bar = UIView(frame: CGRect(x: 5 + i * 6, y: 8, width: 4, height: 18))
            bar.layer.cornerRadius = 2
            bar.backgroundColor = tint
            addSubview(bar)

            let anim = CABasicAnimation(keyPath: "transform.scale.y")
            anim.fromValue = 1
            anim.toValue = 0.4
            anim.duration = 0.55
            anim.autoreverses = true
            anim.repeatCount = .infinity
            anim.beginTime = CACurrentMediaTime() + Double(i) * 0.1
            bar.layer.add(anim, forKey: "barWave")
        }
    }

    private func addPulse() {
        let ring = CAShapeLayer()
        ring.path = UIBezierPath(ovalIn: CGRect(x: 4, y: 4, width: 26, height: 26)).cgPath
        ring.strokeColor = tint.withAlphaComponent(0.45).cgColor
        ring.fillColor = UIColor.clear.cgColor
        ring.lineWidth = 3
        layer.addSublayer(ring)

        let centerDot = UIView(frame: CGRect(x: 13, y: 13, width: 8, height: 8))
        centerDot.layer.cornerRadius = 4
        centerDot.backgroundColor = tint
        addSubview(centerDot)

        let scale = CABasicAnimation(keyPath: "transform.scale")
        scale.fromValue = 0.7
        scale.toValue = 1.3
        scale.duration = 1.05
        scale.repeatCount = .infinity

        let fade = CABasicAnimation(keyPath: "opacity")
        fade.fromValue = 1
        fade.toValue = 0
        fade.duration = 1.05
        fade.repeatCount = .infinity

        ring.add(scale, forKey: "pulseScale")
        ring.add(fade, forKey: "pulseFade")
    }

    private func addSonar() {
        for i in 0..<2 {
            let wave = CAShapeLayer()
            wave.path = UIBezierPath(ovalIn: CGRect(x: 4, y: 4, width: 26, height: 26)).cgPath
            wave.strokeColor = tint.withAlphaComponent(0.5).cgColor
            wave.fillColor = UIColor.clear.cgColor
            wave.lineWidth = 2.5
            layer.addSublayer(wave)

            let scale = CABasicAnimation(keyPath: "transform.scale")
            scale.fromValue = 0.2
            scale.toValue = 1.8
            scale.duration = 1.4
            scale.repeatCount = .infinity
            scale.beginTime = CACurrentMediaTime() + Double(i) * 0.45

            let fade = CABasicAnimation(keyPath: "opacity")
            fade.fromValue = 1
            fade.toValue = 0
            fade.duration = 1.4
            fade.repeatCount = .infinity
            fade.beginTime = scale.beginTime

            wave.add(scale, forKey: "sonarScale")
            wave.add(fade, forKey: "sonarFade")
        }

        let centerDot = UIView(frame: CGRect(x: 14, y: 14, width: 6, height: 6))
        centerDot.layer.cornerRadius = 3
        centerDot.backgroundColor = tint
        addSubview(centerDot)
    }

    private func addOrbit() {
        let ring = CAShapeLayer()
        ring.path = UIBezierPath(ovalIn: CGRect(x: 3, y: 3, width: 28, height: 28)).cgPath
        ring.strokeColor = tint.withAlphaComponent(0.2).cgColor
        ring.fillColor = UIColor.clear.cgColor
        ring.lineWidth = 2
        layer.addSublayer(ring)

        let dot = UIView(frame: CGRect(x: 14, y: 0, width: 7, height: 7))
        dot.layer.cornerRadius = 3.5
        dot.backgroundColor = tint
        addSubview(dot)

        let spin = CABasicAnimation(keyPath: "transform.rotation.z")
        spin.fromValue = 0
        spin.toValue = 2 * Double.pi
        spin.duration = 1.1
        spin.repeatCount = .infinity
        layer.add(spin, forKey: "orbitSpin")
    }

    private func addInfinity() {
        let label = UILabel(frame: bounds.insetBy(dx: 2, dy: 2))
        label.text = "∞"
        label.textColor = tint
        label.font = .systemFont(ofSize: 26, weight: .semibold)
        label.textAlignment = .center
        label.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        addSubview(label)

        let spin = CABasicAnimation(keyPath: "transform.rotation.z")
        spin.fromValue = 0
        spin.toValue = 2 * Double.pi
        spin.duration = 1.7
        spin.repeatCount = .infinity
        layer.add(spin, forKey: "infinitySpin")
    }
}

final class SpinnerViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground

        let spinner = SpinnerView(variant: .sonar, tint: .systemBlue)
        view.addSubview(spinner)
        NSLayoutConstraint.activate([
            spinner.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            spinner.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            spinner.widthAnchor.constraint(equalToConstant: 34),
            spinner.heightAnchor.constraint(equalToConstant: 34)
        ])
    }
}

// MARK: - Usage
// let spinner = SpinnerView(variant: .orbit, tint: .systemBlue)
// view.addSubview(spinner)
// NSLayoutConstraint.activate([
//     spinner.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     spinner.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     spinner.widthAnchor.constraint(equalToConstant: 34),
//     spinner.heightAnchor.constraint(equalToConstant: 34)
// ])
`;

export default function Spinner() {
  const cardClassName =
    "rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 flex flex-col items-center justify-center gap-3";
  const labelClassName = "text-xs text-neutral-500 dark:text-neutral-400";

  return (
    <CodePreview
      title="Spinner"
      description="Eight spinner variants inspired by shadcn patterns, mapped to SwiftUI and UIKit."
      swiftCode={swiftCode}
      uikitCode={uikitCode}
      preview={
        <div className="w-full max-w-3xl grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className={cardClassName}>
            <span className="relative h-10 w-10">
              <span className="absolute inset-0 rounded-full border-[3px] border-neutral-200 dark:border-neutral-800" />
              <span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-500 animate-spin" />
            </span>
            <span className={labelClassName}>Ring</span>
          </div>

          <div className={cardClassName}>
            <span className="relative h-10 w-10 animate-spin">
              <span className="absolute inset-0 rounded-full border-[4px] border-transparent border-t-cyan-500 border-r-cyan-500" />
            </span>
            <span className={labelClassName}>Arc</span>
          </div>

          <div className={cardClassName}>
            <span className="flex h-10 items-center gap-1">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce"
                  style={{ animationDelay: `${index * 0.12}s` }}
                />
              ))}
            </span>
            <span className={labelClassName}>Dots</span>
          </div>

          <div className={cardClassName}>
            <span className="relative flex h-10 w-10 items-center justify-center">
              <span className="absolute h-8 w-8 rounded-full border-2 border-violet-400/60 animate-[spinner-pulse-ring_1.05s_ease-out_infinite]" />
              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
            </span>
            <span className={labelClassName}>Pulse</span>
          </div>

          <div className={cardClassName}>
            <span className="flex h-10 items-end gap-1">
              {[0, 1, 2, 3, 4].map((index) => (
                <span
                  key={index}
                  className="w-1 rounded-full bg-amber-500 animate-[spinner-bars_0.55s_ease-in-out_infinite]"
                  style={{ height: "20px", animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </span>
            <span className={labelClassName}>Bars</span>
          </div>

          <div className={cardClassName}>
            <span className="relative flex h-10 w-10 items-center justify-center">
              {[0, 1].map((index) => (
                <span
                  key={index}
                  className="absolute h-8 w-8 rounded-full border-2 border-rose-400/60 animate-[spinner-sonar_1.4s_ease-out_infinite]"
                  style={{ animationDelay: `${index * 0.45}s` }}
                />
              ))}
              <span className="h-2 w-2 rounded-full bg-rose-500" />
            </span>
            <span className={labelClassName}>Sonar</span>
          </div>

          <div className={cardClassName}>
            <span className="relative h-10 w-10">
              <span className="absolute inset-0 rounded-full border-2 border-sky-500/20" />
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-500 animate-[spinner-orbit_1.1s_linear_infinite]" />
            </span>
            <span className={labelClassName}>Orbit</span>
          </div>

          <div className={cardClassName}>
            <span className="inline-flex h-10 w-10 items-center justify-center text-xl font-semibold text-indigo-500 animate-[spinner-infinity_1.7s_linear_infinite]">
              ∞
            </span>
            <span className={labelClassName}>Infinity</span>
          </div>
        </div>
      }
    />
  );
}
